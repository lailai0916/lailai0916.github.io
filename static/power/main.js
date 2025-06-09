document.addEventListener('DOMContentLoaded', () => {
  // ---------- Canvas & Grid ---------- //
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;

  const GRID = 40; // 40×40 网格
  const TILE = WIDTH / GRID; // 单格 20 像素

  // ---------- 游戏核心参数 ---------- //
  const BULLET_SPEED = 12;
  const BULLET_DAMAGE = 1; // 子弹伤害
  const INITIAL_TOWER_GRID_SIZE = 18;
  const BASE_PULSE_COOLDOWN = 5000; // ms
  const BASE_PULSE_MAX_RADIUS = 450; // pixels
  const BASE_PULSE_SPEED = 350; // pixels per second for visual
  const PULSE_KNOCKBACK_FORCE = 5; // 初始击退速度（像素/帧）
  const PULSE_KNOCKBACK_DAMPING = 0.9; // 每帧衰减系数

  // ---------- 全局状态 ---------- //
  let running = false;
  let score = 0;
  let wave = 1;
  let lastTime = 0;

  // Wave System State
  let waveInProgress = false;
  let enemiesToSpawnThisWave = 0;
  let enemiesSpawnedThisWave = 0;
  let interWaveTimer = 0;
  let spawnInWaveTimer = 0;
  const BURST_INTERVAL_IN_WAVE = 50; // ms, time between bursts
  const ENEMIES_PER_BURST = 10;       // enemies per burst
  const INTER_WAVE_DELAY = 4000; // ms

  let towers = [];
  let enemies = [];
  let bullets = []; // Active bullets
  let bulletPool = []; // Inactive bullets
  let particles = []; // Active particles
  let particlePool = []; // Inactive particles
  let stars = [];
  let base;
  let totalBulletsFired = 0;
  let totalBulletsHit = 0;
  let enemiesKilled = 0;
  let waveMessage = '';
  let waveMessageTimer = 0;
  let screenShakeDuration = 0;
  let screenShakeIntensity = 0;

  // ---------- UI 元素 ---------- //
  const scoreEl = document.getElementById('score');
  const lifeEl = document.getElementById('life');
  const levelEl = document.getElementById('level'); // Note: ID in HTML is 'level'
  const btnStart = document.getElementById('btnStart');
  const btnRestart = document.getElementById('btnRestart');
  const bulletsFiredEl = document.getElementById('bulletsFired');
  const bulletsHitEl = document.getElementById('bulletsHit');
  const enemiesKilledEl = document.getElementById('enemiesKilled');

  // ---------- 敌人定义 (精简特色化) ---------- //
  const ENEMY_TYPES = [
    { color: '#F0E68C', size: 3, speed: 1.2, hp: 8, score: 15, weight: 120 },
    { color: '#CD5C5C', size: 2, speed: 2.8, hp: 3, score: 25, weight: 80 },
    { color: '#556B2F', size: 5, speed: 0.6, hp: 35, score: 40, weight: 60 },
    { color: '#C3B091', size: 4, speed: 1.0, hp: 18, score: 30, weight: 100 },
    { color: '#4D5D53', size: 6, speed: 0.8, hp: 80, score: 120, weight: 25 },
    { color: '#654321', size: 12, speed: 0.3, hp: 300, score: 500, weight: 8 },
    { color: '#6B8E23', size: 3, speed: 1.5, hp: 6, score: 20, weight: 90 },
    { color: '#71797E', size: 4, speed: 0.9, hp: 25, score: 45, weight: 70 },
    { color: '#A0522D', size: 2, speed: 2.2, hp: 4, score: 35, weight: 85 },
    { color: '#2F4F4F', size: 7, speed: 0.4, hp: 150, score: 200, weight: 15 }
  ];

  const totalSpawnWeight = ENEMY_TYPES.reduce((sum, type) => sum + type.weight, 0);

  function getHealthColor(hp, maxHp) {
    const percent = hp / maxHp;
    if (percent > 0.6) return '#BDBDBD'; // Grey (Healthy)
    if (percent > 0.3) return '#FBC02D'; // Yellow (Damaged)
    return '#B71C1C'; // Deep Red (Critical)
  }

  // ---------- 类定义 ---------- //

  class Base {
    constructor() {
      this.x = WIDTH / 2;
      this.y = HEIGHT / 2;
      this.size = TILE * 2;
      this.hp = 100;
      this.maxHp = 100;
      // Pulse Skill
      this.pulseTimer = BASE_PULSE_COOLDOWN;
      this.pulseActive = false;
      this.pulseRadius = 0;
      this.enemiesHitThisPulse = new Set(); // Track enemies hit in the current pulse
    }
    update(dt, enemies) {
      // Pulse Cooldown
      if (!this.pulseActive) {
        this.pulseTimer -= dt;
        if (this.pulseTimer <= 0) {
          this.pulseTimer = BASE_PULSE_COOLDOWN;
          this.pulseActive = true;
          this.pulseRadius = 0;
          this.enemiesHitThisPulse.clear(); // Reset for the new pulse
        }
      }

      // Update pulse animation and apply knockback as it expands
      if (this.pulseActive) {
        this.pulseRadius += BASE_PULSE_SPEED * (dt / 1000);

        // Check for enemies to knock back
        for (const enemy of enemies) {
          if (!this.enemiesHitThisPulse.has(enemy)) {
            const distance = Math.hypot(enemy.x - this.x, enemy.y - this.y);
            if (distance <= this.pulseRadius) {
              const angle = Math.atan2(enemy.y - this.y, enemy.x - this.x);
              enemy.kvx += Math.cos(angle) * PULSE_KNOCKBACK_FORCE;
              enemy.kvy += Math.sin(angle) * PULSE_KNOCKBACK_FORCE;
              this.enemiesHitThisPulse.add(enemy); // Mark as hit for this pulse
            }
          }
        }

        if (this.pulseRadius > BASE_PULSE_MAX_RADIUS) {
          this.pulseActive = false;
        }
      }
    }
    draw() {
      // Draw pulse wave
      if (this.pulseActive) {
        ctx.save();
        const opacity = 1 - (this.pulseRadius / BASE_PULSE_MAX_RADIUS);
        
        // Outer wave - Gritty explosion style
        ctx.strokeStyle = `rgba(255, 138, 101, ${opacity * 0.8})`; // Dusty orange
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.pulseRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Inner wave
        ctx.strokeStyle = `rgba(255, 235, 156, ${opacity * 0.5})`; // Pale yellow
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.pulseRadius * 0.8, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
      }

      const halfSize = this.size / 2;
      // Main body
      ctx.fillStyle = '#00aaff'; // Accent color
      ctx.fillRect(this.x - halfSize, this.y - halfSize, this.size, this.size);
      // Border
      ctx.strokeStyle = '#33bbff'; // Lighter accent
      ctx.lineWidth = 3;
      ctx.strokeRect(this.x - halfSize, this.y - halfSize, this.size, this.size);
    }
  }

  class Star {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      // Use fire colors instead of enemy color
      const fireColors = ['#FFD700', '#FFA500', '#FF4500', '#FFFFFF'];
      this.color = fireColors[Math.floor(Math.random() * fireColors.length)];
      this.size = Math.random() * 3 + 1.5;
      this.life = 40; // longer life
      this.vx = (Math.random() - 0.5) * 5;
      this.vy = (Math.random() - 0.5) * 5 - 2; // 向上初速度
      this.gravity = 0.15;
    }
    update() {
      this.life--;
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
    }
    draw() {
      ctx.globalAlpha = this.life / 40;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1.0;
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
      ctx.globalAlpha = this.life / 30;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
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
      this.angle = 0; // Angle for orientation
      this.kvx = 0;
      this.kvy = 0;
    }
    update() {
      let targetX = WIDTH / 2;
      let targetY = HEIGHT / 2;
      let minDist = Infinity;

      // Find closest tower
      for (const tower of towers) {
        const d = Math.hypot(tower.x - this.x, tower.y - this.y);
        if (d < minDist) {
          minDist = d;
          targetX = tower.x;
          targetY = tower.y;
        }
      }

      // Check if base is closer
      if (base) {
        const dToBase = Math.hypot(base.x - this.x, base.y - this.y);
        if (dToBase < minDist) {
          targetX = base.x;
          targetY = base.y;
        }
      }
      
      const ang = Math.atan2(targetY - this.y, targetX - this.x);
      this.angle = ang; // Update enemy's orientation angle
      this.x += Math.cos(ang) * this.speed;
      this.y += Math.sin(ang) * this.speed;
      this.x += this.kvx;
      this.y += this.kvy;
      this.kvx *= PULSE_KNOCKBACK_DAMPING;
      this.kvy *= PULSE_KNOCKBACK_DAMPING;
      this.x = Math.max(0, Math.min(WIDTH, this.x));
      this.y = Math.max(0, Math.min(HEIGHT, this.y));
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);

      // --- Redrawing enemy as a more realistic B-17-style bomber ---
      
      const bodyLength = this.size * 3;
      const wingSpan = this.size * 3.5;
      const wingWidth = this.size * 0.8;
      const tailSpan = this.size * 1.5;

      // Tailplane (horizontal stabilizer)
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.rect(-bodyLength * 0.5, -tailSpan / 2, bodyLength * 0.2, tailSpan);
      ctx.fill();

      // Fuselage (main body)
      ctx.beginPath();
      ctx.moveTo(bodyLength * 0.5, 0);
      ctx.quadraticCurveTo(bodyLength * 0.4, this.size * 0.5, 0, this.size * 0.5);
      ctx.lineTo(-bodyLength * 0.45, this.size * 0.5);
      ctx.quadraticCurveTo(-bodyLength * 0.5, this.size * 0.5, -bodyLength * 0.5, 0);
      ctx.quadraticCurveTo(-bodyLength * 0.5, -this.size * 0.5, -bodyLength * 0.45, -this.size * 0.5);
      ctx.lineTo(0, -this.size * 0.5);
      ctx.quadraticCurveTo(bodyLength * 0.4, -this.size * 0.5, bodyLength * 0.5, 0);
      ctx.fill();

      // Main wings
      ctx.beginPath();
      ctx.moveTo(0, -wingSpan / 2);
      ctx.lineTo(-wingWidth, -wingSpan / 2);
      ctx.lineTo(-wingWidth, wingSpan / 2);
      ctx.lineTo(0, wingSpan / 2);
      ctx.quadraticCurveTo(wingWidth * 0.5, 0, 0, -wingSpan/2);
      ctx.fill();
      
      // Engines
      const engineRadius = this.size * 0.3;
      ctx.fillStyle = '#424242'; // Darker engine color
      ctx.beginPath();
      ctx.arc(-wingWidth * 0.5, -wingSpan * 0.3, engineRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(-wingWidth * 0.5, wingSpan * 0.3, engineRadius, 0, Math.PI * 2);
      ctx.fill();

      // Cockpit
      ctx.fillStyle = '#A8D2F0'; // Glassy blue
      ctx.beginPath();
      ctx.moveTo(bodyLength * 0.3, -this.size * 0.4);
      ctx.quadraticCurveTo(bodyLength * 0.5, 0, bodyLength * 0.3, this.size * 0.4);
      ctx.lineTo(bodyLength * 0.2, 0);
      ctx.closePath();
      ctx.fill();
      
      ctx.restore();

      // Health bar (non-rotating)
      const barWidth = this.size * 1.8;
      const barHeight = 4;
      const barY = this.y - (wingSpan / 2) - barHeight - 4; // Adjust bar position based on wingspan
      ctx.fillStyle = '#333';
      ctx.fillRect(this.x - barWidth / 2, barY, barWidth, barHeight);
      ctx.fillStyle = getHealthColor(this.hp, this.maxHp);
      ctx.fillRect(this.x - barWidth / 2, barY, barWidth * (this.hp / this.maxHp), barHeight);
    }
  }

  class Bullet {
    constructor(x, y, ang) {
      this.reset(x, y, ang);
    }
    reset(x, y, ang) {
      this.x = x; this.y = y; this.r = 2.5;
      this.vx = Math.cos(ang) * BULLET_SPEED; 
      this.vy = Math.sin(ang) * BULLET_SPEED; 
    }
    update() { 
      this.x += this.vx; 
      this.y += this.vy; 
    }
    draw() { 
      ctx.save();
      
      const length = 15; // Length of the tracer line
      const tailX = this.x - this.vx / BULLET_SPEED * length;
      const tailY = this.y - this.vy / BULLET_SPEED * length;

      // Create a gradient for the tracer effect
      const gradient = ctx.createLinearGradient(this.x, this.y, tailX, tailY);
      gradient.addColorStop(0, '#FFFFFF');        // White-hot tip
      gradient.addColorStop(0.3, '#FFCC80');      // Main tracer color (light orange)
      gradient.addColorStop(1, 'rgba(255, 138, 101, 0)'); // Fading to transparent orange

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';

      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(this.x, this.y);
      ctx.stroke();

      ctx.restore();
    }
    isOffscreen() { return this.x < 0 || this.x > WIDTH || this.y < 0 || this.y > HEIGHT; }
  }

  class Tower {
    constructor(gx, gy) {
      this.gx = gx; this.gy = gy;
      this.x = gx * TILE + TILE / 2;
      this.y = gy * TILE + TILE / 2;
      this.r = TILE * 0.3; // 6px
      this.hp = 5;
      this.maxHp = 5;
      this.cooldown = 0;
      this.range = 300;
      this.fireRate = 100; // 再次降低冷却时间
      this.target = null; // 用于绘制瞄准线
      this.angle = -Math.PI / 2; // 默认朝上
    }
    update(dt) {
      if (this.cooldown > 0) this.cooldown -= dt;
      
      let newTarget = null;
      let minDist = Infinity;
      for (const e of enemies) {
        const d = Math.hypot(e.x - this.x, e.y - this.y);
        if (d < this.range && d < minDist) {
          minDist = d;
          newTarget = e;
        }
      }
      this.target = newTarget;

      if (this.target) {
        const baseAngle = Math.atan2(this.target.y - this.y, this.target.x - this.x);
        this.angle = baseAngle; // 炮台自身精确瞄准

        if (this.cooldown <= 0) {
          // 子弹发射时增加随机偏移量
          const angleOffset = (Math.random() - 0.5) * (6 * Math.PI / 180); // ±3 degrees in radians
          const finalAngle = baseAngle + angleOffset;

          spawnBullet(this.x, this.y, finalAngle);
          totalBulletsFired++;
          this.cooldown = this.fireRate;
        }
      }
    }
    draw() {
      // Aiming line (dashed)
      if (this.target) {
        ctx.save();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 4]);
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.target.x, this.target.y);
        ctx.stroke();
        ctx.restore();
      }
      
      // Draw tower with rotation
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);

      // Tower Base
      ctx.fillStyle = '#9E9E9E'; // Lighter grey
      ctx.beginPath();
      ctx.arc(0, 0, this.r, 0, Math.PI * 2);
      ctx.fill();
      
      // Tower Core
      ctx.fillStyle = '#BDBDBD'; // Metal grey
      ctx.beginPath();
      ctx.arc(0, 0, this.r * 0.7, 0, Math.PI * 2);
      ctx.fill();

      // Barrel
      ctx.fillStyle = '#616161'; // Darker grey
      ctx.fillRect(this.r * 0.5, -2, this.r + 2, 4); 

      ctx.restore();

      // Health bar (non-rotating)
      const barWidth = this.r * 1.8;
      const barHeight = 3;
      const barY = this.y + this.r + 4;
      ctx.fillStyle = '#333';
      ctx.fillRect(this.x - barWidth / 2, barY, barWidth, barHeight);
      ctx.fillStyle = getHealthColor(this.hp, this.maxHp);
      ctx.fillRect(this.x - barWidth / 2, barY, barWidth * (this.hp / this.maxHp), barHeight);
    }
  }

  // ---------- 游戏逻辑 ---------- //

  function init() {
    for (let i = 0; i < 150; i++) { // More stars
      stars.push(new Star());
    }
  }

  function resetGame() {
    running = true;
    score = 0;
    wave = 1;
    base = new Base();
    
    waveInProgress = false;
    interWaveTimer = INTER_WAVE_DELAY; // Start countdown for the first wave

    totalBulletsFired = 0;
    totalBulletsHit = 0;
    enemiesKilled = 0;
    towers = [];
    enemies = [];
    bullets = [];
    particles = [];

    // Add starting towers in the 18x18 area around the 2x2 base
    const center = GRID / 2;
    const halfGridSize = INITIAL_TOWER_GRID_SIZE / 2;
    const startX = center - halfGridSize;
    const startY = center - halfGridSize;

    for (let i = 0; i < INITIAL_TOWER_GRID_SIZE; i++) {
      for (let j = 0; j < INITIAL_TOWER_GRID_SIZE; j++) {
        const gx = startX + i;
        const gy = startY + j;

        const isBaseCell = (gx >= center - 1 && gx < center + 1 && gy >= center - 1 && gy < center + 1);

        if (!isBaseCell) {
          towers.push(new Tower(gx, gy));
        }
      }
    }
    
    btnRestart.style.display = 'none';
    const overlay = document.querySelector('.game-over-overlay');
    if (overlay) overlay.remove();
    
    lastTime = performance.now();
    gameLoop(lastTime);
  }

  function startGame() {
    btnStart.style.display = 'none';
    resetGame();
  }

  function endGame() {
    running = false;
    btnRestart.style.display = 'inline-block';

    const overlay = document.createElement('div');
    overlay.className = 'game-over-overlay';
    overlay.innerHTML = `<h2>防空塔已失守</h2><p>最终战果: ${score}</p><p>你抵挡了 ${wave} 波进攻</p>`;
    
    // Append the overlay to the main game container. CSS will handle the centering.
    const mainContainer = document.querySelector('.game-main');
    if (mainContainer) {
      mainContainer.appendChild(overlay);
    } else {
      // Fallback in case the container isn't found
      document.body.appendChild(overlay);
    }
  }

  function startNextWave() {
    waveInProgress = true;
    enemiesToSpawnThisWave = 400 + wave * 200;
    enemiesSpawnedThisWave = 0;
    spawnInWaveTimer = 0;
    
    showWaveMessage(`第 ${wave} 波进攻来袭!`);
  }
  
  function showWaveMessage(msg) {
    waveMessage = msg;
    waveMessageTimer = 2000; // Show message for 2 seconds
  }

  function spawnEnemy() {
    let randomWeight = Math.random() * totalSpawnWeight;
    let selectedType = ENEMY_TYPES[ENEMY_TYPES.length - 1];

    for (const type of ENEMY_TYPES) {
        randomWeight -= type.weight;
        if (randomWeight <= 0) {
            selectedType = type;
            break;
        }
    }
    
    let x, y;
    const spawnEdge = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left

    switch (spawnEdge) {
      case 0: // Top
        x = Math.random() * WIDTH;
        y = -selectedType.size;
        break;
      case 1: // Right
        x = WIDTH + selectedType.size;
        y = Math.random() * HEIGHT;
        break;
      case 2: // Bottom
        x = Math.random() * WIDTH;
        y = HEIGHT + selectedType.size;
        break;
      case 3: // Left
        x = -selectedType.size;
        y = Math.random() * HEIGHT;
        break;
    }
    enemies.push(new Enemy(selectedType, x, y));
  }

  function triggerScreenShake(intensity, duration) {
    // Don't let a weaker shake override a stronger one currently in progress
    screenShakeIntensity = Math.max(screenShakeIntensity, intensity);
    // Take the longer duration to ensure the shake feels right
    screenShakeDuration = Math.max(screenShakeDuration, duration);
  }

  function createExplosion(x, y, color) {
    for (let i = 0; i < 6; i++) { // Reduced particle count from 8 to 6
      spawnParticle(x, y, color);
    }
  }

  // --- Object Pool Functions ---
  function spawnBullet(x, y, ang) {
    let bullet;
    if (bulletPool.length > 0) {
      bullet = bulletPool.pop();
      bullet.reset(x, y, ang);
    } else {
      bullet = new Bullet(x, y, ang);
    }
    bullets.push(bullet);
  }

  function spawnParticle(x, y, color) {
    let particle;
    if (particlePool.length > 0) {
      particle = particlePool.pop();
      particle.reset(x, y, color);
    } else {
      particle = new Particle(x, y, color);
    }
    particles.push(particle);
  }
  // --- End Object Pool Functions ---

  function update(dt) {
    if (waveMessageTimer > 0) {
      waveMessageTimer -= dt;
    }

    if (screenShakeDuration > 0) {
      screenShakeDuration -= dt;
      if (screenShakeDuration <= 0) {
        screenShakeIntensity = 0;
      }
    }

    if (!waveInProgress) {
      interWaveTimer -= dt;
      if (interWaveTimer <= 0) {
        startNextWave();
      }
    } else {
      spawnInWaveTimer += dt;
      if (spawnInWaveTimer >= BURST_INTERVAL_IN_WAVE && enemiesSpawnedThisWave < enemiesToSpawnThisWave) {
        for (let i = 0; i < ENEMIES_PER_BURST && enemiesSpawnedThisWave < enemiesToSpawnThisWave; i++) {
          spawnEnemy();
          enemiesSpawnedThisWave++;
        }
        spawnInWaveTimer = 0;
      }
    }
    
    stars.forEach(s => s.update());
    if (base) {
      base.update(dt, enemies);
    }
    bullets.forEach(b => b.update());
    enemies.forEach(e => e.update());
    towers.forEach(t => t.update(dt));
    particles.forEach(p => p.update());

    // Check for wave clear
    if (waveInProgress && enemiesSpawnedThisWave === enemiesToSpawnThisWave && enemies.length === 0) {
      waveInProgress = false;
      wave++;
      interWaveTimer = INTER_WAVE_DELAY;
      showWaveMessage(`已击退第 ${wave - 1} 波进攻!`);
    }

    // Collisions
    for (let i = enemies.length - 1; i >= 0; i--) {
      const enemy = enemies[i];
      if(!enemy) continue;
      
      for (let j = bullets.length - 1; j >= 0; j--) {
        const bullet = bullets[j];
        if (Math.hypot(enemy.x - bullet.x, enemy.y - bullet.y) < enemy.size + bullet.r) {
          enemy.hp -= BULLET_DAMAGE;
          totalBulletsHit++;
          
          // Release bullet to pool using swap-and-pop
          bulletPool.push(bullet);
          bullets[j] = bullets[bullets.length - 1];
          bullets.pop();

          if (enemy.hp <= 0) {
            score += enemy.score;
            createExplosion(enemy.x, enemy.y, enemy.color);
            enemies.splice(i, 1);
            enemiesKilled++;
            triggerScreenShake(1, 100); // Add a very slight shake on kill
            break; 
          }
        }
      }
      if (enemy.hp <= 0) continue; 

      const baseLeft = base.x - base.size / 2;
      const baseRight = base.x + base.size / 2;
      const baseTop = base.y - base.size / 2;
      const baseBottom = base.y + base.size / 2;
      const closestX = Math.max(baseLeft, Math.min(enemy.x, baseRight));
      const closestY = Math.max(baseTop, Math.min(enemy.y, baseBottom));
      const distanceX = enemy.x - closestX;
      const distanceY = enemy.y - closestY;

      if ((distanceX * distanceX + distanceY * distanceY) < (enemy.size * enemy.size)) {
        base.hp--;
        createExplosion(enemy.x, enemy.y, enemy.color);
        enemies.splice(i, 1);
        enemiesKilled++;
        triggerScreenShake(5, 200); // Restore correct base-hit shake intensity
        if (base.hp <= 0) {
          endGame();
          return;
        }
        continue;
      }

      for (let j = towers.length - 1; j >= 0; j--) {
        const tower = towers[j];
        if (Math.hypot(enemy.x - tower.x, enemy.y - tower.y) < enemy.size + tower.r) {
          tower.hp--;
          createExplosion(enemy.x, enemy.y, enemy.color);
          enemies.splice(i, 1);
          enemiesKilled++;
          triggerScreenShake(1, 100); // Keep the slight shake on enemy/tower collision
          if (tower.hp <= 0) {
            towers.splice(j, 1);
          }
          break;
        }
      }
    }
    
    // Optimized-out .filter() calls with high-performance loops
    // Clean up offscreen bullets
    for (let i = bullets.length - 1; i >= 0; i--) {
        if (bullets[i].isOffscreen()) {
            const b = bullets[i];
            bulletPool.push(b);
            bullets[i] = bullets[bullets.length - 1];
            bullets.pop();
        }
    }
    
    // Clean up dead particles
    for (let i = particles.length - 1; i >= 0; i--) {
        if (particles[i].life <= 0) {
            const p = particles[i];
            particlePool.push(p);
            particles[i] = particles[particles.length - 1];
            particles.pop();
        }
    }
  }

  function draw() {
    ctx.fillStyle = '#121417'; // Match new dark background
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.save();

    // Apply screen shake if active
    if (screenShakeDuration > 0) {
      const dx = (Math.random() - 0.5) * 2 * screenShakeIntensity;
      const dy = (Math.random() - 0.5) * 2 * screenShakeIntensity;
      ctx.translate(dx, dy);
    }

    stars.forEach(s => s.draw());
    
    ctx.strokeStyle = '#1A1D21'; // Match new panel background for subtle grid
    ctx.lineWidth = 0.5; // Thinner grid
    for (let i = 1; i < GRID; i++) {
      const p = i * TILE;
      ctx.beginPath(); ctx.moveTo(p, 0); ctx.lineTo(p, HEIGHT); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, p); ctx.lineTo(WIDTH, p); ctx.stroke();
    }

    if (base) {
      base.draw();
    }

    towers.forEach(t => t.draw());
    enemies.forEach(e => e.draw());
    bullets.forEach(b => b.draw());
    particles.forEach(p => p.draw());

    levelEl.textContent = wave;
    scoreEl.textContent = score;
    lifeEl.textContent = base ? base.hp : 100;
    bulletsFiredEl.textContent = totalBulletsFired;
    bulletsHitEl.textContent = totalBulletsHit;
    enemiesKilledEl.textContent = enemiesKilled;

    if (waveMessageTimer > 0) {
      ctx.save();
      ctx.font = 'bold 48px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = `rgba(255, 255, 0, ${waveMessageTimer / 2000})`;
      ctx.fillText(waveMessage, WIDTH / 2, HEIGHT / 2 - 100);
      ctx.restore();
    }
    
    ctx.restore();
  }

  function gameLoop(timestamp) {
    if (!running) return;
    const dt = timestamp - lastTime;
    lastTime = timestamp;

    update(dt);
    draw();

    requestAnimationFrame(gameLoop);
  }

  // ---------- 交互 ---------- //
  canvas.addEventListener('click', e => {
    if (!running) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const gx = Math.floor(x / TILE);
    const gy = Math.floor(y / TILE);

    if (gx < 0 || gx >= GRID || gy < 0 || gy >= GRID) return;
    if (towers.some(t => t.gx === gx && t.gy === gy)) return;

    // Prevent building on the base
    const center = GRID / 2;
    const baseGridX = center - 1;
    const baseGridY = center - 1;
    if (gx >= baseGridX && gx < baseGridX + 2 && gy >= baseGridY && gy < baseGridY + 2) {
      return;
    }

    towers.push(new Tower(gx, gy));
  });

  btnStart.addEventListener('click', startGame);
  btnRestart.addEventListener('click', resetGame);

  // ---------- 初始化 ---------- //
  init();
  draw();
});
