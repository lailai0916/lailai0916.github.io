---
title: 'GitHub 成就工具'
date: 2025-07-17T15:48
authors: lailai
tags: [project]
---

[GitHub](https://github.com) 个人主页中有一个 **Achievements** 板块，可以通过自动化脚本获取成就。

<!-- truncate -->

## 参考资料

- [Personalizing your profile - GitHub Docs](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/personalizing-your-profile#displaying-badges-on-your-profile)
- [drknzz/GitHub-Achievements](https://github.com/drknzz/GitHub-Achievements)

## 自动化脚本（Playwright）

```bash npm2yarn
npm install playwright
```

## 登录账号

```js title="login.js"
const { chromium } = require('playwright');

async function loginWithAccount(accountName) {
  const storageFile = `${accountName}.json`;

  console.log(`正在为账户 ${accountName} 启动登录流程...`);

  const browser = await chromium.launch({ headless: false });

  let context;
  try {
    context = await browser.newContext({ storageState: storageFile });
    console.log(`加载 ${accountName} 的已有登录缓存...`);
  } catch (error) {
    context = await browser.newContext();
    console.log(`创建 ${accountName} 的新登录会话...`);
  }

  const page = await context.newPage();
  await page.goto('https://github.com');

  console.log(`请在浏览器中操作，60秒后自动保存 ${accountName} 的登录状态`);
  await page.waitForTimeout(60000);

  await context.storageState({ path: storageFile });
  console.log(`${accountName} 的登录状态已自动保存到 ${storageFile}`);

  await browser.close();
}

// 主程序
(async () => {
  // 从命令行参数获取账户名，默认为 account1
  const accountName = process.argv[2] || 'account1';

  // 验证账户名格式
  if (!accountName.match(/^account\d+$/)) {
    console.error('错误：账户名格式应为 accountN（如 account1, account2）');
    process.exit(1);
  }

  try {
    await loginWithAccount(accountName);
  } catch (error) {
    console.error('登录过程中出现错误：', error);
    process.exit(1);
  }
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
  await page.keyboard.type(`t-${String(k).padStart(3, '0')}`);
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
  await page.waitForTimeout(3000);
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
  await page.waitForTimeout(1000);

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
  const context = await browser.newContext({ storageState: 'account1.json' });
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
const { chromium } = require('playwright');
const repoUrl = 'https://github.com/lailai0916/test';

async function autoCreateDiscussionAnswer(page, k) {
  const newDiscussionUrl = `${repoUrl}/discussions/new?category=q-a`;

  console.log('打开创建新讨论页面');
  await page.goto(newDiscussionUrl, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const discussionTitle = `t-${String(k).padStart(3, '0')}`;

  console.log('输入讨论标题');
  await page.waitForSelector('#js-discussion-title', { timeout: 5000 });
  await page.fill('#js-discussion-title', discussionTitle);
  await page.waitForTimeout(1000);

  const discussionBody = `d-${String(k).padStart(3, '0')}`;

  console.log('输入讨论内容');
  await page.waitForSelector('#discussion_body', { timeout: 5000 });
  await page.fill('#discussion_body', discussionBody);
  await page.waitForTimeout(1000);

  console.log('点击 Start discussion');
  await page.waitForSelector('button:has-text("Start discussion")', {
    timeout: 5000,
  });
  await page.click('button:has-text("Start discussion")');
  await page.waitForTimeout(3000);

  // 获取创建的讨论URL
  const discussionUrl = page.url();
  console.log(`讨论已创建，URL: ${discussionUrl}`);

  // 添加回答讨论的逻辑
  console.log(
    `执行第 ${k} 次 Galaxy Brain 操作 - 标题: ${discussionTitle}, 内容: ${discussionBody}`
  );

  await page.waitForTimeout(2000);
  console.log(`第 ${k} 次 Galaxy Brain 操作完成`);

  return discussionUrl;
}

async function autoAnswerDiscussion(page, discussionUrl, k) {
  console.log('用account1打开讨论URL');
  await page.goto(discussionUrl, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // 在回复输入框中输入内容
  const answerContent = `a-${String(k).padStart(3, '0')}`;
  console.log(`输入回复内容: ${answerContent}`);

  await page.waitForSelector('#new_comment_field', { timeout: 5000 });
  await page.fill('#new_comment_field', answerContent);
  await page.waitForTimeout(1000);

  // 点击发送按钮
  console.log('点击 Comment 按钮');
  await page.waitForSelector('button:has-text("Comment")', { timeout: 5000 });
  await page.click('button:has-text("Comment")');
  await page.waitForTimeout(2000);

  console.log(`第 ${k} 次回复操作完成`);
}

(async () => {
  const browser = await chromium.launch({ headless: false });

  // 创建account2的上下文用于创建讨论
  const context2 = await browser.newContext({ storageState: 'account2.json' });
  const page2 = await context2.newPage();

  // 创建account1的上下文用于访问讨论
  const context1 = await browser.newContext({ storageState: 'account1.json' });
  const page1 = await context1.newPage();

  for (let i = 30; i < 100; i++) {
    // 用account2创建讨论
    const discussionUrl = await autoCreateDiscussionAnswer(page2, i);

    // 用account1回复讨论
    await autoAnswerDiscussion(page1, discussionUrl, i);

    // 用account2重新打开讨论页面
    console.log('用account2重新打开讨论页面');
    await page2.goto(discussionUrl, { waitUntil: 'domcontentloaded' });
    await page2.waitForTimeout(2000);

    // 点击标记答案按钮
    console.log('点击标记答案按钮');
    await page2.waitForSelector('button:has-text("Mark as answer")', {
      timeout: 5000,
    });
    await page2.click('button:has-text("Mark as answer")');
    await page2.waitForTimeout(2000);

    await page1.waitForTimeout(3000 + Math.random() * 2000);
  }

  await browser.close();
})();
```
