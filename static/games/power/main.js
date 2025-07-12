document.addEventListener('DOMContentLoaded', () => {
  // ========== 配置常量 ========== //
  const CONFIG = {
    // 画布和网格
    GRID_SIZE: 100,
    WORLD_WIDTH: 2000,
    WORLD_HEIGHT: 2000,
    get TILE_SIZE() {
      return this.WORLD_WIDTH / this.GRID_SIZE;
    },

    // 游戏参数
    BULLET_SPEED: 12,
    BULLET_DAMAGE: 1,
    INITIAL_TOWER_GRID_SIZE: 18,

    // 炮塔参数
    TOWER_RANGE: 400, // 炮塔射程
    TOWER_FIRE_RATE: 100, // 炮塔射速（冷却时间）
    TOWER_HP: 5, // 炮塔血量
    TOWER_MAX_HP: 5, // 炮塔最大血量

    // 基地脉冲
    BASE_PULSE_COOLDOWN: 5000,
    BASE_PULSE_MAX_RADIUS: 600,
    BASE_PULSE_SPEED: 350,
    PULSE_KNOCKBACK_FORCE: 5,
    PULSE_KNOCKBACK_DAMPING: 0.9,

    // 波次系统
    BURST_INTERVAL_IN_WAVE: 50,
    ENEMIES_PER_BURST: 10,
    INTER_WAVE_DELAY: 4000,

    // 视口
    MIN_SCALE: 0.5,
    MAX_SCALE: 3.0,
    CAMERA_SMOOTHING: 0.1,
  };

  // ========== DOM 元素 ========== //
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;

  const UI_ELEMENTS = {
    life: document.getElementById('life'),
    level: document.getElementById('level'),
    btnStart: document.getElementById('btnStart'),
    btnRestart: document.getElementById('btnRestart'),
    bulletsFired: document.getElementById('bulletsFired'),
    bulletsHit: document.getElementById('bulletsHit'),
    enemiesKilled: document.getElementById('enemiesKilled'),
  };

  // ========== 视口和相机系统 ========== //
  const viewport = {
    x: 0,
    y: 0,
    width: WIDTH,
    height: HEIGHT,
    scale: 1.0,
    minScale: CONFIG.MIN_SCALE,
    maxScale: CONFIG.MAX_SCALE,
    get defaultScale() {
      return WIDTH / (CONFIG.TILE_SIZE * 40);
    },
  };

  const camera = {
    isDragging: false,
    lastMouseX: 0,
    lastMouseY: 0,
    targetX: 0,
    targetY: 0,
    smoothing: CONFIG.CAMERA_SMOOTHING,
  };

  // ========== 坐标转换工具 ========== //
  const CoordinateUtils = {
    getDefaultViewPosition() {
      const viewWidth = WIDTH / viewport.defaultScale;
      const viewHeight = HEIGHT / viewport.defaultScale;
      return {
        x: (CONFIG.WORLD_WIDTH - viewWidth) / 2,
        y: (CONFIG.WORLD_HEIGHT - viewHeight) / 2,
      };
    },

    worldToScreen(worldX, worldY) {
      return {
        x: (worldX - viewport.x) * viewport.scale,
        y: (worldY - viewport.y) * viewport.scale,
      };
    },

    screenToWorld(screenX, screenY) {
      return {
        x: viewport.x + screenX / viewport.scale,
        y: viewport.y + screenY / viewport.scale,
      };
    },

    worldToGrid(worldX, worldY) {
      return {
        x: Math.floor(worldX / CONFIG.TILE_SIZE),
        y: Math.floor(worldY / CONFIG.TILE_SIZE),
      };
    },

    gridToWorld(gridX, gridY) {
      return {
        x: gridX * CONFIG.TILE_SIZE + CONFIG.TILE_SIZE / 2,
        y: gridY * CONFIG.TILE_SIZE + CONFIG.TILE_SIZE / 2,
      };
    },
  };

  // 初始化视口
  viewport.scale = viewport.defaultScale;
  const defaultPos = CoordinateUtils.getDefaultViewPosition();
  camera.targetX = defaultPos.x;
  camera.targetY = defaultPos.y;
  viewport.x = camera.targetX;
  viewport.y = camera.targetY;

  // ========== 游戏状态管理 ========== //
  const GameState = {
    running: false,
    wave: 1,
    lastTime: 0,

    // 波次系统
    waveInProgress: false,
    enemiesToSpawnThisWave: 0,
    enemiesSpawnedThisWave: 0,
    interWaveTimer: 0,
    spawnInWaveTimer: 0,

    // 统计数据
    totalBulletsFired: 0,
    totalBulletsHit: 0,
    enemiesKilled: 0,

    // 视觉效果
    waveMessage: '',
    waveMessageTimer: 0,
    screenShakeDuration: 0,
    screenShakeIntensity: 0,

    // 游戏对象
    towers: [],
    enemies: [],
    bullets: [],
    bulletPool: [],
    particles: [],
    particlePool: [],
    base: null,
  };

  // ========== 敌人配置 ========== //
  const ENEMY_TYPES = [
    { color: '#CD5C5C', size: 4, speed: 3.0, hp: 5, weight: 100 },
    { color: '#A0522D', size: 4, speed: 2.5, hp: 10, weight: 100 },
    { color: '#C3B091', size: 4, speed: 2.0, hp: 20, weight: 80 },
    { color: '#F0E68C', size: 4, speed: 1.5, hp: 30, weight: 40 },
    { color: '#6B8E23', size: 4, speed: 1.5, hp: 50, weight: 40 },
    { color: '#71797E', size: 8, speed: 1.0, hp: 100, weight: 80 },
    { color: '#556B2F', size: 8, speed: 1.0, hp: 120, weight: 40 },
    { color: '#4D5D53', size: 8, speed: 1.0, hp: 150, weight: 40 },
    { color: '#2F4F4F', size: 8, speed: 1.0, hp: 200, weight: 20 },
    { color: '#654321', size: 15, speed: 0.7, hp: 500, weight: 20 },
  ];

  const TOTAL_SPAWN_WEIGHT = ENEMY_TYPES.reduce(
    (sum, type) => sum + type.weight,
    0
  );

  // ========== 工具函数 ========== //
  const Utils = {
    getHealthColor(hp, maxHp) {
      const percent = hp / maxHp;
      if (percent > 0.6) return '#BDBDBD';
      if (percent > 0.3) return '#FBC02D';
      return '#B71C1C';
    },

    isInViewport(worldX, worldY, size = 0) {
      const screenPos = CoordinateUtils.worldToScreen(worldX, worldY);
      const scaledSize = size * viewport.scale;
      return (
        screenPos.x + scaledSize >= 0 &&
        screenPos.x - scaledSize <= WIDTH &&
        screenPos.y + scaledSize >= 0 &&
        screenPos.y - scaledSize <= HEIGHT
      );
    },

    clamp(value, min, max) {
      return Math.max(min, Math.min(max, value));
    },
  };

  // ========== 游戏类定义 ========== //
  class Base {
    constructor() {
      this.x = CONFIG.WORLD_WIDTH / 2;
      this.y = CONFIG.WORLD_HEIGHT / 2;
      this.size = CONFIG.TILE_SIZE * 2;
      this.hp = 100;
      this.maxHp = 100;
      this.pulseTimer = CONFIG.BASE_PULSE_COOLDOWN;
      this.pulseActive = false;
      this.pulseRadius = 0;
      this.enemiesHitThisPulse = new Set();
    }
    update(dt, enemies) {
      if (!this.pulseActive) {
        this.pulseTimer -= dt;
        if (this.pulseTimer <= 0) {
          this.pulseTimer = CONFIG.BASE_PULSE_COOLDOWN;
          this.pulseActive = true;
          this.pulseRadius = 0;
          this.enemiesHitThisPulse.clear();
        }
      }

      if (this.pulseActive) {
        this.pulseRadius += CONFIG.BASE_PULSE_SPEED * (dt / 1000);

        for (const enemy of enemies) {
          if (!this.enemiesHitThisPulse.has(enemy)) {
            const distance = Math.hypot(enemy.x - this.x, enemy.y - this.y);
            if (distance <= this.pulseRadius) {
              const angle = Math.atan2(enemy.y - this.y, enemy.x - this.x);
              enemy.kvx += Math.cos(angle) * CONFIG.PULSE_KNOCKBACK_FORCE;
              enemy.kvy += Math.sin(angle) * CONFIG.PULSE_KNOCKBACK_FORCE;
              this.enemiesHitThisPulse.add(enemy);
            }
          }
        }

        if (this.pulseRadius > CONFIG.BASE_PULSE_MAX_RADIUS) {
          this.pulseActive = false;
        }
      }
    }
    draw() {
      const screenPos = CoordinateUtils.worldToScreen(this.x, this.y);

      if (this.pulseActive) {
        ctx.save();
        const opacity = 1 - this.pulseRadius / CONFIG.BASE_PULSE_MAX_RADIUS;

        ctx.strokeStyle = `rgba(255, 138, 101, ${opacity * 0.8})`;
        ctx.lineWidth = 4 * viewport.scale;
        ctx.beginPath();
        ctx.arc(
          screenPos.x,
          screenPos.y,
          this.pulseRadius * viewport.scale,
          0,
          Math.PI * 2
        );
        ctx.stroke();

        ctx.strokeStyle = `rgba(255, 235, 156, ${opacity * 0.5})`;
        ctx.lineWidth = 2 * viewport.scale;
        ctx.beginPath();
        ctx.arc(
          screenPos.x,
          screenPos.y,
          this.pulseRadius * 0.8 * viewport.scale,
          0,
          Math.PI * 2
        );
        ctx.stroke();

        ctx.restore();
      }

      const halfSize = (this.size * viewport.scale) / 2;
      ctx.fillStyle = '#00aaff';
      ctx.fillRect(
        screenPos.x - halfSize,
        screenPos.y - halfSize,
        this.size * viewport.scale,
        this.size * viewport.scale
      );
      ctx.strokeStyle = '#33bbff';
      ctx.lineWidth = 3 * viewport.scale;
      ctx.strokeRect(
        screenPos.x - halfSize,
        screenPos.y - halfSize,
        this.size * viewport.scale,
        this.size * viewport.scale
      );
    }
  }

  class Particle {
    constructor(x, y, color) {
      this.reset(x, y, color);
    }
    reset(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.size = Math.random() * 4 + 2;
      this.life = 30; // 持续 30 帧
      this.vx = (Math.random() - 0.5) * 4;
      this.vy = (Math.random() - 0.5) * 4 - 2; // 向上初速度
      this.gravity = 0.2;
    }
    update() {
      this.life--;
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
    }
    draw() {
      const screenPos = CoordinateUtils.worldToScreen(this.x, this.y);
      ctx.globalAlpha = this.life / 30;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(
        screenPos.x,
        screenPos.y,
        this.size * viewport.scale,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.globalAlpha = 1.0;
    }
  }

  class Enemy {
    constructor(type, x, y) {
      Object.assign(this, type);
      this.x = x;
      this.y = y;
      this.maxHp = this.hp;
      this.angle = 0;
      this.kvx = 0;
      this.kvy = 0;
    }

    update() {
      let targetX = CONFIG.WORLD_WIDTH / 2;
      let targetY = CONFIG.WORLD_HEIGHT / 2;
      let minDist = Infinity;

      for (const tower of GameState.towers) {
        const d = Math.hypot(tower.x - this.x, tower.y - this.y);
        if (d < minDist) {
          minDist = d;
          targetX = tower.x;
          targetY = tower.y;
        }
      }

      if (GameState.base) {
        const dToBase = Math.hypot(
          GameState.base.x - this.x,
          GameState.base.y - this.y
        );
        if (dToBase < minDist) {
          targetX = GameState.base.x;
          targetY = GameState.base.y;
        }
      }

      const ang = Math.atan2(targetY - this.y, targetX - this.x);
      this.angle = ang;
      this.x += Math.cos(ang) * this.speed;
      this.y += Math.sin(ang) * this.speed;
      this.x += this.kvx;
      this.y += this.kvy;
      this.kvx *= CONFIG.PULSE_KNOCKBACK_DAMPING;
      this.kvy *= CONFIG.PULSE_KNOCKBACK_DAMPING;
      this.x = Utils.clamp(this.x, 0, CONFIG.WORLD_WIDTH);
      this.y = Utils.clamp(this.y, 0, CONFIG.WORLD_HEIGHT);
    }
    draw() {
      const screenPos = CoordinateUtils.worldToScreen(this.x, this.y);

      ctx.save();
      ctx.translate(screenPos.x, screenPos.y);
      ctx.rotate(this.angle);
      ctx.scale(viewport.scale, viewport.scale);

      const bodyLength = this.size * 3;
      const wingSpan = this.size * 3.5;
      const wingWidth = this.size * 0.8;
      const tailSpan = this.size * 1.5;

      // 尾翼
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.rect(-bodyLength * 0.5, -tailSpan / 2, bodyLength * 0.2, tailSpan);
      ctx.fill();

      // 机身
      ctx.beginPath();
      ctx.moveTo(bodyLength * 0.5, 0);
      ctx.quadraticCurveTo(
        bodyLength * 0.4,
        this.size * 0.5,
        0,
        this.size * 0.5
      );
      ctx.lineTo(-bodyLength * 0.45, this.size * 0.5);
      ctx.quadraticCurveTo(
        -bodyLength * 0.5,
        this.size * 0.5,
        -bodyLength * 0.5,
        0
      );
      ctx.quadraticCurveTo(
        -bodyLength * 0.5,
        -this.size * 0.5,
        -bodyLength * 0.45,
        -this.size * 0.5
      );
      ctx.lineTo(0, -this.size * 0.5);
      ctx.quadraticCurveTo(
        bodyLength * 0.4,
        -this.size * 0.5,
        bodyLength * 0.5,
        0
      );
      ctx.fill();

      // 主翼
      ctx.beginPath();
      ctx.moveTo(0, -wingSpan / 2);
      ctx.lineTo(-wingWidth, -wingSpan / 2);
      ctx.lineTo(-wingWidth, wingSpan / 2);
      ctx.lineTo(0, wingSpan / 2);
      ctx.quadraticCurveTo(wingWidth * 0.5, 0, 0, -wingSpan / 2);
      ctx.fill();

      // 引擎
      const engineRadius = this.size * 0.3;
      ctx.fillStyle = '#424242';
      ctx.beginPath();
      ctx.arc(-wingWidth * 0.5, -wingSpan * 0.3, engineRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(-wingWidth * 0.5, wingSpan * 0.3, engineRadius, 0, Math.PI * 2);
      ctx.fill();

      // 驾驶舱
      ctx.fillStyle = '#A8D2F0';
      ctx.beginPath();
      ctx.moveTo(bodyLength * 0.3, -this.size * 0.4);
      ctx.quadraticCurveTo(
        bodyLength * 0.5,
        0,
        bodyLength * 0.3,
        this.size * 0.4
      );
      ctx.lineTo(bodyLength * 0.2, 0);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      // 血条
      const barWidth = this.size * 1.8 * viewport.scale;
      const barHeight = 4 * viewport.scale;
      const barY =
        screenPos.y - (wingSpan / 2) * viewport.scale - barHeight - 4;
      ctx.fillStyle = '#333';
      ctx.fillRect(screenPos.x - barWidth / 2, barY, barWidth, barHeight);
      ctx.fillStyle = Utils.getHealthColor(this.hp, this.maxHp);
      ctx.fillRect(
        screenPos.x - barWidth / 2,
        barY,
        barWidth * (this.hp / this.maxHp),
        barHeight
      );
    }
  }

  class Bullet {
    constructor(x, y, ang) {
      this.reset(x, y, ang);
    }

    reset(x, y, ang) {
      this.x = x;
      this.y = y;
      this.r = 2.5;
      this.vx = Math.cos(ang) * CONFIG.BULLET_SPEED;
      this.vy = Math.sin(ang) * CONFIG.BULLET_SPEED;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
    }

    draw() {
      const screenPos = CoordinateUtils.worldToScreen(this.x, this.y);

      ctx.save();

      const length = 15 * viewport.scale;
      const tailX = screenPos.x - (this.vx / CONFIG.BULLET_SPEED) * length;
      const tailY = screenPos.y - (this.vy / CONFIG.BULLET_SPEED) * length;

      const gradient = ctx.createLinearGradient(
        screenPos.x,
        screenPos.y,
        tailX,
        tailY
      );
      gradient.addColorStop(0, '#FFFFFF');
      gradient.addColorStop(0.3, '#FFCC80');
      gradient.addColorStop(1, 'rgba(255, 138, 101, 0)');

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3 * viewport.scale;
      ctx.lineCap = 'round';

      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(screenPos.x, screenPos.y);
      ctx.stroke();

      ctx.restore();
    }

    isOffscreen() {
      return (
        this.x < 0 ||
        this.x > CONFIG.WORLD_WIDTH ||
        this.y < 0 ||
        this.y > CONFIG.WORLD_HEIGHT
      );
    }
  }

  class Tower {
    constructor(gx, gy) {
      this.gx = gx;
      this.gy = gy;
      this.x = gx * CONFIG.TILE_SIZE + CONFIG.TILE_SIZE / 2;
      this.y = gy * CONFIG.TILE_SIZE + CONFIG.TILE_SIZE / 2;
      this.r = CONFIG.TILE_SIZE * 0.3;
      this.hp = CONFIG.TOWER_HP;
      this.maxHp = CONFIG.TOWER_MAX_HP;
      this.cooldown = 0;
      this.range = CONFIG.TOWER_RANGE;
      this.fireRate = CONFIG.TOWER_FIRE_RATE;
      this.target = null;
      this.angle = -Math.PI / 2;
    }

    update(dt) {
      if (this.cooldown > 0) this.cooldown -= dt;

      let newTarget = null;
      let minDist = Infinity;
      for (const e of GameState.enemies) {
        const d = Math.hypot(e.x - this.x, e.y - this.y);
        if (d < this.range && d < minDist) {
          minDist = d;
          newTarget = e;
        }
      }
      this.target = newTarget;

      if (this.target) {
        const baseAngle = Math.atan2(
          this.target.y - this.y,
          this.target.x - this.x
        );
        this.angle = baseAngle;

        if (this.cooldown <= 0) {
          const angleOffset = (Math.random() - 0.5) * ((6 * Math.PI) / 180);
          const finalAngle = baseAngle + angleOffset;

          ObjectPool.spawnBullet(this.x, this.y, finalAngle);
          GameState.totalBulletsFired++;
          this.cooldown = this.fireRate;
        }
      }
    }
    draw() {
      const screenPos = CoordinateUtils.worldToScreen(this.x, this.y);

      if (this.target) {
        const targetScreenPos = CoordinateUtils.worldToScreen(
          this.target.x,
          this.target.y
        );
        ctx.save();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1 * viewport.scale;
        ctx.setLineDash([2 * viewport.scale, 4 * viewport.scale]);
        ctx.beginPath();
        ctx.moveTo(screenPos.x, screenPos.y);
        ctx.lineTo(targetScreenPos.x, targetScreenPos.y);
        ctx.stroke();
        ctx.restore();
      }

      ctx.save();
      ctx.translate(screenPos.x, screenPos.y);
      ctx.rotate(this.angle);
      ctx.scale(viewport.scale, viewport.scale);

      ctx.fillStyle = '#9E9E9E';
      ctx.beginPath();
      ctx.arc(0, 0, this.r, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#BDBDBD';
      ctx.beginPath();
      ctx.arc(0, 0, this.r * 0.7, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#616161';
      ctx.fillRect(this.r * 0.5, -2, this.r + 2, 4);

      ctx.restore();

      const barWidth = this.r * 1.8 * viewport.scale;
      const barHeight = 3 * viewport.scale;
      const barY = screenPos.y + this.r * viewport.scale + 4;
      ctx.fillStyle = '#333';
      ctx.fillRect(screenPos.x - barWidth / 2, barY, barWidth, barHeight);
      ctx.fillStyle = Utils.getHealthColor(this.hp, this.maxHp);
      ctx.fillRect(
        screenPos.x - barWidth / 2,
        barY,
        barWidth * (this.hp / this.maxHp),
        barHeight
      );
    }
  }

  // ========== 对象池管理 ========== //
  const ObjectPool = {
    spawnBullet(x, y, ang) {
      let bullet;
      if (GameState.bulletPool.length > 0) {
        bullet = GameState.bulletPool.pop();
        bullet.reset(x, y, ang);
      } else {
        bullet = new Bullet(x, y, ang);
      }
      GameState.bullets.push(bullet);
    },

    spawnParticle(x, y, color) {
      let particle;
      if (GameState.particlePool.length > 0) {
        particle = GameState.particlePool.pop();
        particle.reset(x, y, color);
      } else {
        particle = new Particle(x, y, color);
      }
      GameState.particles.push(particle);
    },

    recycleBullet(index) {
      const bullet = GameState.bullets[index];
      GameState.bulletPool.push(bullet);
      GameState.bullets[index] =
        GameState.bullets[GameState.bullets.length - 1];
      GameState.bullets.pop();
    },

    recycleParticle(index) {
      const particle = GameState.particles[index];
      GameState.particlePool.push(particle);
      GameState.particles[index] =
        GameState.particles[GameState.particles.length - 1];
      GameState.particles.pop();
    },
  };

  // ========== 游戏逻辑函数 ========== //
  function init() {
    // 游戏初始化
  }

  function resetGame() {
    GameState.running = true;
    GameState.wave = 1;
    GameState.base = new Base();

    GameState.waveInProgress = false;
    GameState.interWaveTimer = CONFIG.INTER_WAVE_DELAY;

    GameState.totalBulletsFired = 0;
    GameState.totalBulletsHit = 0;
    GameState.enemiesKilled = 0;
    GameState.towers = [];
    GameState.enemies = [];
    GameState.bullets = [];
    GameState.particles = [];

    // Add starting towers in the 18x18 area around the 2x2 base
    const center = CONFIG.GRID_SIZE / 2;
    const halfGridSize = CONFIG.INITIAL_TOWER_GRID_SIZE / 2;
    const startX = center - halfGridSize;
    const startY = center - halfGridSize;

    for (let i = 0; i < CONFIG.INITIAL_TOWER_GRID_SIZE; i++) {
      for (let j = 0; j < CONFIG.INITIAL_TOWER_GRID_SIZE; j++) {
        const gx = startX + i;
        const gy = startY + j;

        const isBaseCell =
          gx >= center - 1 &&
          gx < center + 1 &&
          gy >= center - 1 &&
          gy < center + 1;

        if (!isBaseCell) {
          GameState.towers.push(new Tower(gx, gy));
        }
      }
    }

    UI_ELEMENTS.btnRestart.style.display = 'none';
    const overlay = document.querySelector('.game-over-overlay');
    if (overlay) overlay.remove();

    GameState.lastTime = performance.now();
    gameLoop(GameState.lastTime);
  }

  function startGame() {
    UI_ELEMENTS.btnStart.style.display = 'none';
    resetGame();
  }

  function endGame() {
    GameState.running = false;
    UI_ELEMENTS.btnRestart.style.display = 'inline-block';

    const overlay = document.createElement('div');
    overlay.className = 'game-over-overlay';
    overlay.innerHTML = `<h2>防空塔已失守</h2><p>你抵挡了 ${GameState.wave} 波进攻</p>`;

    const mainContainer = document.querySelector('.game-main');
    if (mainContainer) {
      mainContainer.appendChild(overlay);
    } else {
      document.body.appendChild(overlay);
    }
  }

  function startNextWave() {
    GameState.waveInProgress = true;
    GameState.enemiesToSpawnThisWave = 200 + GameState.wave * 100;
    GameState.enemiesSpawnedThisWave = 0;
    GameState.spawnInWaveTimer = 0;

    showWaveMessage(`第 ${GameState.wave} 波进攻来袭!`);
  }

  function showWaveMessage(msg) {
    GameState.waveMessage = msg;
    GameState.waveMessageTimer = 2000;
  }

  function spawnEnemy() {
    let randomWeight = Math.random() * TOTAL_SPAWN_WEIGHT;
    let selectedType = ENEMY_TYPES[ENEMY_TYPES.length - 1];

    for (const type of ENEMY_TYPES) {
      randomWeight -= type.weight;
      if (randomWeight <= 0) {
        selectedType = type;
        break;
      }
    }

    let x, y;
    const spawnEdge = Math.floor(Math.random() * 4);

    switch (spawnEdge) {
      case 0:
        x = Math.random() * CONFIG.WORLD_WIDTH;
        y = -selectedType.size;
        break;
      case 1:
        x = CONFIG.WORLD_WIDTH + selectedType.size;
        y = Math.random() * CONFIG.WORLD_HEIGHT;
        break;
      case 2:
        x = Math.random() * CONFIG.WORLD_WIDTH;
        y = CONFIG.WORLD_HEIGHT + selectedType.size;
        break;
      case 3:
        x = -selectedType.size;
        y = Math.random() * CONFIG.WORLD_HEIGHT;
        break;
    }

    GameState.enemies.push(new Enemy(selectedType, x, y));
  }

  function triggerScreenShake(intensity, duration) {
    GameState.screenShakeIntensity = Math.max(
      GameState.screenShakeIntensity,
      intensity
    );
    GameState.screenShakeDuration = Math.max(
      GameState.screenShakeDuration,
      duration
    );
  }

  function createExplosion(x, y, color) {
    for (let i = 0; i < 6; i++) {
      ObjectPool.spawnParticle(x, y, color);
    }
  }

  function updateViewport(dt) {
    const dx = camera.targetX - viewport.x;
    const dy = camera.targetY - viewport.y;

    viewport.x += dx * camera.smoothing;
    viewport.y += dy * camera.smoothing;

    const scaledWidth = viewport.width / viewport.scale;
    const scaledHeight = viewport.height / viewport.scale;

    viewport.x = Math.max(
      0,
      Math.min(CONFIG.WORLD_WIDTH - scaledWidth, viewport.x)
    );
    viewport.y = Math.max(
      0,
      Math.min(CONFIG.WORLD_HEIGHT - scaledHeight, viewport.y)
    );
  }

  function update(dt) {
    updateViewport(dt);

    if (GameState.waveMessageTimer > 0) {
      GameState.waveMessageTimer -= dt;
    }

    if (GameState.screenShakeDuration > 0) {
      GameState.screenShakeDuration -= dt;
      if (GameState.screenShakeDuration <= 0) {
        GameState.screenShakeIntensity = 0;
      }
    }

    if (!GameState.waveInProgress) {
      GameState.interWaveTimer -= dt;
      if (GameState.interWaveTimer <= 0) {
        startNextWave();
      }
    } else {
      GameState.spawnInWaveTimer += dt;
      if (
        GameState.spawnInWaveTimer >= CONFIG.BURST_INTERVAL_IN_WAVE &&
        GameState.enemiesSpawnedThisWave < GameState.enemiesToSpawnThisWave
      ) {
        for (
          let i = 0;
          i < CONFIG.ENEMIES_PER_BURST &&
          GameState.enemiesSpawnedThisWave < GameState.enemiesToSpawnThisWave;
          i++
        ) {
          spawnEnemy();
          GameState.enemiesSpawnedThisWave++;
        }
        GameState.spawnInWaveTimer = 0;
      }
    }

    if (GameState.base) {
      GameState.base.update(dt, GameState.enemies);
    }
    GameState.bullets.forEach((b) => b.update());
    GameState.enemies.forEach((e) => e.update());
    GameState.towers.forEach((t) => t.update(dt));
    GameState.particles.forEach((p) => p.update());

    // Check for wave clear
    if (
      GameState.waveInProgress &&
      GameState.enemiesSpawnedThisWave === GameState.enemiesToSpawnThisWave &&
      GameState.enemies.length === 0
    ) {
      GameState.waveInProgress = false;
      GameState.wave++;
      GameState.interWaveTimer = CONFIG.INTER_WAVE_DELAY;
      showWaveMessage(`已击退第 ${GameState.wave - 1} 波进攻!`);
    }

    // Collisions
    for (let i = GameState.enemies.length - 1; i >= 0; i--) {
      const enemy = GameState.enemies[i];
      if (!enemy) continue;

      for (let j = GameState.bullets.length - 1; j >= 0; j--) {
        const bullet = GameState.bullets[j];
        if (
          Math.hypot(enemy.x - bullet.x, enemy.y - bullet.y) <
          enemy.size + bullet.r
        ) {
          enemy.hp -= CONFIG.BULLET_DAMAGE;
          GameState.totalBulletsHit++;

          // 手动移除子弹，避免在嵌套循环中使用对象池
          GameState.bulletPool.push(bullet);
          GameState.bullets[j] =
            GameState.bullets[GameState.bullets.length - 1];
          GameState.bullets.pop();

          if (enemy.hp <= 0) {
            createExplosion(enemy.x, enemy.y, enemy.color);
            GameState.enemies.splice(i, 1);
            GameState.enemiesKilled++; // 只有被我方火力击杀才计入歼敌数
            triggerScreenShake(1, 100);
            break;
          }
        }
      }
      if (enemy.hp <= 0) continue;

      const baseLeft = GameState.base.x - GameState.base.size / 2;
      const baseRight = GameState.base.x + GameState.base.size / 2;
      const baseTop = GameState.base.y - GameState.base.size / 2;
      const baseBottom = GameState.base.y + GameState.base.size / 2;
      const closestX = Math.max(baseLeft, Math.min(enemy.x, baseRight));
      const closestY = Math.max(baseTop, Math.min(enemy.y, baseBottom));
      const distanceX = enemy.x - closestX;
      const distanceY = enemy.y - closestY;

      if (
        distanceX * distanceX + distanceY * distanceY <
        enemy.size * enemy.size
      ) {
        GameState.base.hp--;
        createExplosion(enemy.x, enemy.y, enemy.color);
        GameState.enemies.splice(i, 1);
        // 撞击基地死亡不计入歼敌数
        triggerScreenShake(5, 200);
        if (GameState.base.hp <= 0) {
          endGame();
          return;
        }
        continue;
      }

      for (let j = GameState.towers.length - 1; j >= 0; j--) {
        const tower = GameState.towers[j];
        if (
          Math.hypot(enemy.x - tower.x, enemy.y - tower.y) <
          enemy.size + tower.r
        ) {
          tower.hp--;
          createExplosion(enemy.x, enemy.y, enemy.color);
          GameState.enemies.splice(i, 1);
          // 撞击炮塔死亡不计入歼敌数
          triggerScreenShake(1, 100);
          if (tower.hp <= 0) {
            GameState.towers.splice(j, 1);
          }
          break;
        }
      }
    }

    // Clean up offscreen bullets
    for (let i = GameState.bullets.length - 1; i >= 0; i--) {
      if (GameState.bullets[i].isOffscreen()) {
        const bullet = GameState.bullets[i];
        GameState.bulletPool.push(bullet);
        GameState.bullets[i] = GameState.bullets[GameState.bullets.length - 1];
        GameState.bullets.pop();
      }
    }

    // Clean up dead particles
    for (let i = GameState.particles.length - 1; i >= 0; i--) {
      if (GameState.particles[i].life <= 0) {
        const particle = GameState.particles[i];
        GameState.particlePool.push(particle);
        GameState.particles[i] =
          GameState.particles[GameState.particles.length - 1];
        GameState.particles.pop();
      }
    }
  }

  function draw() {
    ctx.fillStyle = '#121417'; // Match new dark background
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.save();

    // Apply screen shake if active
    if (GameState.screenShakeDuration > 0) {
      const dx = (Math.random() - 0.5) * 2 * GameState.screenShakeIntensity;
      const dy = (Math.random() - 0.5) * 2 * GameState.screenShakeIntensity;
      ctx.translate(dx, dy);
    }

    // 绘制网格
    ctx.strokeStyle = '#1A1D21';
    ctx.lineWidth = 0.5 * viewport.scale;

    const startGridX = Math.floor(viewport.x / CONFIG.TILE_SIZE);
    const endGridX = Math.min(
      CONFIG.GRID_SIZE,
      Math.ceil(
        (viewport.x + viewport.width / viewport.scale) / CONFIG.TILE_SIZE
      )
    );
    const startGridY = Math.floor(viewport.y / CONFIG.TILE_SIZE);
    const endGridY = Math.min(
      CONFIG.GRID_SIZE,
      Math.ceil(
        (viewport.y + viewport.height / viewport.scale) / CONFIG.TILE_SIZE
      )
    );

    for (let i = startGridX; i <= endGridX; i++) {
      const worldX = i * CONFIG.TILE_SIZE;
      const screenX = (worldX - viewport.x) * viewport.scale;
      ctx.beginPath();
      ctx.moveTo(screenX, 0);
      ctx.lineTo(screenX, HEIGHT);
      ctx.stroke();
    }

    for (let i = startGridY; i <= endGridY; i++) {
      const worldY = i * CONFIG.TILE_SIZE;
      const screenY = (worldY - viewport.y) * viewport.scale;
      ctx.beginPath();
      ctx.moveTo(0, screenY);
      ctx.lineTo(WIDTH, screenY);
      ctx.stroke();
    }

    // 绘制游戏对象
    if (
      GameState.base &&
      Utils.isInViewport(
        GameState.base.x,
        GameState.base.y,
        GameState.base.size
      )
    ) {
      GameState.base.draw();
    }

    GameState.towers.forEach((t) => {
      if (Utils.isInViewport(t.x, t.y, t.r)) {
        t.draw();
      }
    });

    GameState.enemies.forEach((e) => {
      if (Utils.isInViewport(e.x, e.y, e.size)) {
        e.draw();
      }
    });

    GameState.bullets.forEach((b) => {
      if (Utils.isInViewport(b.x, b.y, 10)) {
        b.draw();
      }
    });

    GameState.particles.forEach((p) => {
      if (Utils.isInViewport(p.x, p.y, 10)) {
        p.draw();
      }
    });

    drawMinimap();

    UI_ELEMENTS.level.textContent = GameState.wave;
    UI_ELEMENTS.life.textContent = GameState.base ? GameState.base.hp : 100;
    UI_ELEMENTS.bulletsFired.textContent = GameState.totalBulletsFired;
    UI_ELEMENTS.bulletsHit.textContent = GameState.totalBulletsHit;
    UI_ELEMENTS.enemiesKilled.textContent = GameState.enemiesKilled;

    if (GameState.waveMessageTimer > 0) {
      ctx.save();
      ctx.font = 'bold 48px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = `rgba(255, 255, 0, ${GameState.waveMessageTimer / 2000})`;
      ctx.fillText(GameState.waveMessage, WIDTH / 2, HEIGHT / 2 - 100);
      ctx.restore();
    }

    ctx.restore();
  }

  // ========== 响应式布局管理 ========== //
  function updateLayout() {
    const container = document.querySelector('.container');
    const pageWrapper = document.querySelector('.page-wrapper');
    const gameMain = document.querySelector('.game-main');
    const canvas = document.getElementById('gameCanvas');

    if (!container || !pageWrapper || !gameMain || !canvas) {
      return;
    }

    // 从 CSS 变量中获取侧边栏宽度和间距
    const style = getComputedStyle(document.documentElement);
    const sidebarWidth =
      parseInt(style.getPropertyValue('--sidebar-width'), 10) || 280;
    const gap = parseInt(style.getPropertyValue('--gap'), 10) || 20;
    const wrapperPadding = 10 * 2; // .page-wrapper padding

    const availableWidth = window.innerWidth - wrapperPadding;
    const availableHeight = window.innerHeight - wrapperPadding;

    // 水平布局所需总宽度：一个正方形画布（高度占满）+ 两个侧边栏 + 间距
    const requiredWidthForHorizontal =
      availableHeight + 2 * sidebarWidth + 2 * gap;

    if (availableWidth >= requiredWidthForHorizontal) {
      // 空间足够，使用左右布局
      container.classList.remove('layout-vertical');
      container.classList.add('layout-horizontal');
      pageWrapper.classList.remove('layout-vertical');
      pageWrapper.classList.add('layout-horizontal');
    } else {
      // 空间不足，使用上下布局
      container.classList.remove('layout-horizontal');
      container.classList.add('layout-vertical');
      pageWrapper.classList.remove('layout-horizontal');
      pageWrapper.classList.add('layout-vertical');
    }

    // 重新计算画布尺寸以适应其容器
    // 使用 requestAnimationFrame 来确保在下一帧开始时获取最新的尺寸
    requestAnimationFrame(() => {
      const mainRect = gameMain.getBoundingClientRect();
      // 减去 .game-main 的内边距 (padding: 20px)
      const mainPadding = 40;
      const canvasContainerSize =
        Math.min(mainRect.width, mainRect.height) - mainPadding;

      canvas.style.width = `${canvasContainerSize}px`;
      canvas.style.height = `${canvasContainerSize}px`;

      // 更新视口尺寸，这对于游戏内坐标转换很重要
      viewport.width = canvas.clientWidth;
      viewport.height = canvas.clientHeight;
    });
  }

  // 绘制小地图
  function drawMinimap() {
    const minimapSize = 150;
    const minimapX = WIDTH - minimapSize - 20;
    const minimapY = 20;
    const minimapScale = minimapSize / CONFIG.WORLD_WIDTH;

    ctx.save();

    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(minimapX, minimapY, minimapSize, minimapSize);

    ctx.strokeStyle = '#444';
    ctx.strokeRect(minimapX, minimapY, minimapSize, minimapSize);

    // 绘制基地
    if (GameState.base) {
      ctx.fillStyle = '#00aaff';
      const baseMiniX = minimapX + GameState.base.x * minimapScale;
      const baseMiniY = minimapY + GameState.base.y * minimapScale;
      ctx.fillRect(baseMiniX - 2, baseMiniY - 2, 4, 4);
    }

    // 绘制炮塔
    ctx.fillStyle = '#999';
    GameState.towers.forEach((t) => {
      const towerMiniX = minimapX + t.x * minimapScale;
      const towerMiniY = minimapY + t.y * minimapScale;
      ctx.fillRect(towerMiniX - 1, towerMiniY - 1, 2, 2);
    });

    // 绘制敌人
    ctx.fillStyle = '#ff4444';
    GameState.enemies.forEach((e) => {
      const enemyMiniX = minimapX + e.x * minimapScale;
      const enemyMiniY = minimapY + e.y * minimapScale;
      ctx.fillRect(enemyMiniX - 1, enemyMiniY - 1, 2, 2);
    });

    // 绘制当前视口区域
    ctx.strokeStyle = '#ffff00';
    ctx.lineWidth = 1;
    const viewportMiniX = minimapX + viewport.x * minimapScale;
    const viewportMiniY = minimapY + viewport.y * minimapScale;
    const viewportMiniWidth = (viewport.width / viewport.scale) * minimapScale;
    const viewportMiniHeight =
      (viewport.height / viewport.scale) * minimapScale;
    ctx.strokeRect(
      viewportMiniX,
      viewportMiniY,
      viewportMiniWidth,
      viewportMiniHeight
    );

    ctx.restore();
  }

  function gameLoop(timestamp) {
    if (!GameState.running) return;
    const dt = timestamp - GameState.lastTime;
    GameState.lastTime = timestamp;

    updateViewport(dt);
    update(dt);
    draw();

    requestAnimationFrame(gameLoop);
  }

  // 游戏交互 - 已禁用点击放置火炮功能

  canvas.addEventListener('mousedown', (e) => {
    if (!GameState.running) return;
    camera.isDragging = true;
    camera.lastMouseX = e.clientX;
    camera.lastMouseY = e.clientY;
    canvas.style.cursor = 'grabbing';
  });

  canvas.addEventListener('mousemove', (e) => {
    if (!GameState.running || !camera.isDragging) return;

    const deltaX = (e.clientX - camera.lastMouseX) / viewport.scale;
    const deltaY = (e.clientY - camera.lastMouseY) / viewport.scale;

    camera.targetX -= deltaX;
    camera.targetY -= deltaY;

    const scaledWidth = viewport.width / viewport.scale;
    const scaledHeight = viewport.height / viewport.scale;
    camera.targetX = Utils.clamp(
      camera.targetX,
      0,
      CONFIG.WORLD_WIDTH - scaledWidth
    );
    camera.targetY = Utils.clamp(
      camera.targetY,
      0,
      CONFIG.WORLD_HEIGHT - scaledHeight
    );

    camera.lastMouseX = e.clientX;
    camera.lastMouseY = e.clientY;
  });

  canvas.addEventListener('mouseup', () => {
    camera.isDragging = false;
    canvas.style.cursor = 'default';
  });

  canvas.addEventListener('mouseleave', () => {
    camera.isDragging = false;
    canvas.style.cursor = 'default';
  });

  canvas.addEventListener('wheel', (e) => {
    if (!GameState.running) return;
    e.preventDefault();

    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = viewport.scale * zoomFactor;

    if (newScale >= viewport.minScale && newScale <= viewport.maxScale) {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const worldPos = CoordinateUtils.screenToWorld(mouseX, mouseY);

      viewport.scale = newScale;

      const newScreenPos = CoordinateUtils.worldToScreen(
        worldPos.x,
        worldPos.y
      );
      const offsetX = (newScreenPos.x - mouseX) / viewport.scale;
      const offsetY = (newScreenPos.y - mouseY) / viewport.scale;

      camera.targetX += offsetX;
      camera.targetY += offsetY;

      const scaledWidth = viewport.width / viewport.scale;
      const scaledHeight = viewport.height / viewport.scale;
      camera.targetX = Utils.clamp(
        camera.targetX,
        0,
        CONFIG.WORLD_WIDTH - scaledWidth
      );
      camera.targetY = Utils.clamp(
        camera.targetY,
        0,
        CONFIG.WORLD_HEIGHT - scaledHeight
      );
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!GameState.running) return;

    const moveSpeed = 100 / viewport.scale;

    switch (e.key) {
      case 'w':
      case 'W':
      case 'ArrowUp':
        camera.targetY -= moveSpeed;
        break;
      case 's':
      case 'S':
      case 'ArrowDown':
        camera.targetY += moveSpeed;
        break;
      case 'a':
      case 'A':
      case 'ArrowLeft':
        camera.targetX -= moveSpeed;
        break;
      case 'd':
      case 'D':
      case 'ArrowRight':
        camera.targetX += moveSpeed;
        break;
      case ' ':
        e.preventDefault();
        viewport.scale = viewport.defaultScale;
        const resetPos = CoordinateUtils.getDefaultViewPosition();
        camera.targetX = resetPos.x;
        camera.targetY = resetPos.y;
        break;
    }

    const scaledWidth = viewport.width / viewport.scale;
    const scaledHeight = viewport.height / viewport.scale;
    camera.targetX = Utils.clamp(
      camera.targetX,
      0,
      CONFIG.WORLD_WIDTH - scaledWidth
    );
    camera.targetY = Utils.clamp(
      camera.targetY,
      0,
      CONFIG.WORLD_HEIGHT - scaledHeight
    );
  });

  UI_ELEMENTS.btnStart.addEventListener('click', startGame);
  UI_ELEMENTS.btnRestart.addEventListener('click', resetGame);

  // 初始化布局并监听窗口大小变化
  updateLayout();
  window.addEventListener('resize', updateLayout);

  // 初始化游戏
  init();
  draw();
});
