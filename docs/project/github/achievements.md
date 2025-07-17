# GitHub 成就工具

GitHub 个人主页中有一个“Achievements”板块。

## 参考资料

- [Personalizing your profile - GitHub Docs](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/personalizing-your-profile#displaying-badges-on-your-profile)
- [drknzz/GitHub-Achievements: 🔥 A Complete List of GitHub Profile Badges and Achievements 🔥](https://github.com/drknzz/GitHub-Achievements)

## 自动化脚本（Playwright）

```bash
npm install playwright
npx playwright install
```

## 账号登录脚本

```js title="login.js"
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://github.com");
  console.log("请登录 GitHub");
  await page.waitForTimeout(60000);

  await context.storageState({ path: "login.json" });
  await browser.close();
})();
```

## Pull Shark

```js title="pull_shark.js"
const { chromium } = require('playwright');
const repoUrl = 'https://github.com/lailai0916/test';

async function autoCreatePullRequest(page, k) {
  console.log('打开仓库');
  await page.goto(repoUrl, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  console.log('点击 Switch branches/tags');
  await page.waitForSelector('#branch-picker-repos-header-ref-selector', {
    timeout: 5000,
  });
  await page.click('#branch-picker-repos-header-ref-selector');
  await page.waitForTimeout(1000);

  const branchName = `patch-${String(k).padStart(3, '0')}`;

  console.log('输入分支名');
  await page.waitForSelector(
    'input[placeholder="Find or create a branch..."]',
    { timeout: 5000 }
  );
  await page.fill(
    'input[placeholder="Find or create a branch..."]',
    branchName
  );
  await page.waitForTimeout(1000);
  console.log('点击创建分支按钮');
  await page.waitForSelector(
    `button:has-text("Create branch ${branchName} from main")`,
    { timeout: 5000 }
  );
  await page.click(`button:has-text("Create branch ${branchName} from main")`);
  await page.waitForTimeout(3000);

  await page.goto(`${repoUrl}/edit/${branchName}/README.md`, {
    waitUntil: 'domcontentloaded',
  });
  await page.waitForSelector('.cm-content[role="textbox"]', { timeout: 5000 });
  await page.click('.cm-content[role="textbox"]');
  await page.waitForTimeout(1000);

  console.log('输入内容到编辑框');
  await page.keyboard.press('Meta+A');
  await page.keyboard.press('Backspace');
  await page.keyboard.type(`# ${String(k).padStart(3, '0')}`);
  await page.waitForTimeout(1000);

  console.log('点击 Commit changes...');
  await page.waitForSelector('button:has-text("Commit changes...")', {
    timeout: 5000,
  });
  await page.click('button:has-text("Commit changes...")');
  await page.waitForTimeout(3000);

  console.log('点击 Commit changes');
  await page.waitForSelector(
    'div[role="dialog"] >> button:has-text("Commit changes")',
    { timeout: 5000 }
  );
  const confirmButton = page.locator(
    'div[role="dialog"] >> button:has-text("Commit changes")'
  );
  await confirmButton.click();

  await page.waitForTimeout(3000);
  await page.goto(`${repoUrl}/compare/${branchName}?expand=1`, {
    waitUntil: 'domcontentloaded',
  });

  await page.waitForTimeout(1000);
  const createPRButton = page.locator('button.hx_create-pr-button');
  await createPRButton.waitFor({ timeout: 5000 });
  await page.waitForTimeout(1000);

  console.log('点击 Create pull request');
  await createPRButton.click();
  await page.waitForTimeout(3000);
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  const mergeButton = page.locator('button:has-text("Merge pull request")');
  await mergeButton.waitFor({ timeout: 5000 });
  console.log('点击 Merge pull request');
  await mergeButton.click();
  await page.waitForTimeout(1000);

  const confirmMergeButton = page.locator('button:has-text("Confirm merge")');
  await confirmMergeButton.waitFor({ timeout: 5000 });
  console.log('点击 Confirm merge');
  await confirmMergeButton.click();
  await page.waitForTimeout(1000);

  await page.goto(repoUrl, { waitUntil: 'domcontentloaded' });
  console.log(`分支 ${branchName} 已完成合并`);
}

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ storageState: 'login.json' });
  const page = await context.newPage();

  for (let i = 1; i < 100; i++) {
    await autoCreatePullRequest(page, i);
    await page.waitForTimeout(3000 + Math.random() * 2000);
  }

  await browser.close();
})();
```

## Galaxy Brain

```js title="galaxy_brain.js"

```
