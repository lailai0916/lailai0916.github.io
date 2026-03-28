---
title: lailai0916
---

我的 GitHub 个人主页仓库和搭建教程。

## 说明

`username/username` 是一个特殊的 GitHub 仓库，其中的 `README.md` 文件会显示在 GitHub 个人主页。你可以在这个文件中展示个人简介、项目简介、技术栈图标、状态统计图等各种信息。

## 项目链接

<GitHub repo="lailai0916/lailai0916" />

## 创建仓库

1. 打开 GitHub 并登录账号。

2. 在 GitHub 首页右上角点击加号 `+` 按钮，点击 [New repository](https://github.com/new)（新建仓库）。

- **Repository name**（仓库名称）必须与你的 GitHub 用户名相同，例如「`lailai0916/lailai0916`」。
- **Description**（描述）为可选项，例如「`lailai's Profile`」。
- 勾选 **Add a README file**（添加 README 文件）。
- 点击 **Create repository**（创建仓库）。

<ImageWindow url="https://github.com/new">

![](https://cloud.lailai.one/f/8bOiq/lailai0916-create-repository-light.png#gh-light-mode-only)![](https://cloud.lailai.one/f/k36cX/lailai0916-create-repository-dark.png#gh-dark-mode-only)

</ImageWindow>

3. 创建完仓库后，会跳转到仓库主页，例如「`https://github.com/lailai0916/lailai0916`」。

- 仓库的根目录下有一个 `README.md` 文件，会在你的个人主页展示。

<ImageWindow url="https://github.com/lailai0916/lailai0916">

![](https://cloud.lailai.one/f/z0oSA/lailai0916-repository-homepage-light.png#gh-light-mode-only)![](https://cloud.lailai.one/f/OD4tg/lailai0916-repository-homepage-dark.png#gh-dark-mode-only)

</ImageWindow>

4. 点击 **Edit README**（编辑 README）编辑文件，完成后点击 **Commit changes**（提交更改）保存文件。

<ImageWindow url="https://github.com/lailai0916/lailai0916/edit/main/README.md">

![](https://cloud.lailai.one/f/AJ1HA/lailai0916-edit-readme-light.png#gh-light-mode-only)![](https://cloud.lailai.one/f/wkrIg/lailai0916-edit-readme-dark.png#gh-dark-mode-only)

</ImageWindow>

## 标题 & 国际化

`README.md` 文件使用 Markdown 格式，并支持嵌入 HTML 代码。

我选择用 HTML 编写一个居中的标题，并添加表情和链接。

还可以添加多语言版本的链接来实现国际化。

```html live
<div align="center">
  <h1>🎉 Hello, I'm lailai 🥳</h1>
  <p>
    <a href="README.md">English</a> | <a href="README.zh-Hans.md">简体中文</a>
  </p>
</div>
```

## 技术栈图标

技术栈图标推荐使用 [Skill Icons](https://skillicons.dev)。

<GitHub repo="tandpfun/skill-icons" />

1. 用 Markdown 或 HTML 格式嵌入图片。

```markdown
![](https://skillicons.dev/icons?i=js,html,css,wasm)
```

<BrowserWindow>

![](https://skillicons.dev/icons?i=js,html,css,wasm)

</BrowserWindow>

2. 通过参数和标记实现深浅模式切换。

- 参数 `&theme=light` 和 `&theme=dark` 可以指定图标的深浅模式。
- 标记 `#gh-light-mode-only` 和 `#gh-dark-mode-only` 可以指定某个元素仅在 GitHub 的 **Light mode**（浅色模式）或 **Dark mode**（深色模式）模式下显示。

```markdown
![](https://skillicons.dev/icons?i=java,kotlin,nodejs,figma&theme=light#gh-light-mode-only)![](https://skillicons.dev/icons?i=java,kotlin,nodejs,figma&theme=dark#gh-dark-mode-only)
```

<BrowserWindow>

![](https://skillicons.dev/icons?i=java,kotlin,nodejs,figma&theme=light#gh-light-mode-only)![](https://skillicons.dev/icons?i=java,kotlin,nodejs,figma&theme=dark#gh-dark-mode-only)

</BrowserWindow>

## 状态统计图

状态统计图推荐使用 [GitHub Profile Summary Cards](https://github-profile-summary-cards.vercel.app/demo.html) 或 [GitHub Stats Visualization](https://github.com/jstrieb/github-stats)。

### GitHub Profile Summary Cards

[GitHub Profile Summary Cards](https://github-profile-summary-cards.vercel.app/demo.html) 的优点是使用方便，直接修改链接即可使用。

<GitHub repo="vn7n24fzkq/github-profile-summary-cards" />

1. 用 Markdown 或 HTML 格式嵌入图片。

```markdown
![](https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=lailai0916)
```

<BrowserWindow>

![](https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=lailai0916)

</BrowserWindow>

2. 类似技术栈图标，状态统计图也能实现深浅模式切换。

```markdown
![](https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=lailai0916&theme=default#gh-light-mode-only)![](https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=lailai0916&theme=dark#gh-dark-mode-only)
```

<BrowserWindow>

![](https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=lailai0916&theme=default#gh-light-mode-only)![](https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=lailai0916&theme=dark#gh-dark-mode-only)

</BrowserWindow>

3. 这个状态统计图还支持更换不同的种类和主题。

```markdown
![](https://github-profile-summary-cards.vercel.app/api/cards/stats?username=lailai0916&theme=2077)
![](https://github-profile-summary-cards.vercel.app/api/cards/productive-time?username=lailai0916&theme=tokyonight)
```

<BrowserWindow>

![](https://github-profile-summary-cards.vercel.app/api/cards/stats?username=lailai0916&theme=2077)
![](https://github-profile-summary-cards.vercel.app/api/cards/productive-time?username=lailai0916&theme=tokyonight)

</BrowserWindow>

### GitHub Stats Visualization

[GitHub Stats Visualization](https://github.com/jstrieb/github-stats) 的优点是带有动画，但需要自行构建，相对会比较麻烦。

<GitHub repo="jstrieb/github-stats" />

1. 创建一个具有 `read:user` 和 `repo` 权限的 **Personal access tokens**（个人访问令牌）。

- 在 GitHub 首页右上方点击头像，并点击 **Settings**（设置）。
- 依次点击 **Developer settings** $\to$ **Personal access tokens** $\to$ **Tokens (classic)** $\to$ **Generate new token** $\to$ **Generate new token (classic)**。

<ImageWindow url="https://github.com/settings/tokens">

![](https://cloud.lailai.one/f/rK4cM/lailai0916-setting-token-light.png#gh-light-mode-only)![](https://cloud.lailai.one/f/P53sy/lailai0916-setting-token-dark.png#gh-dark-mode-only)

</ImageWindow>

- 建议将 **Expiration**（有效期）设置为 **No expiration**（无有效期）。
- 在 **Select scopes**（选择范围）中勾选 `read:user` 和 `repo` 权限。
- 点击 **Create token**（创建令牌）。

<ImageWindow url="https://github.com/settings/tokens/new">

![](https://cloud.lailai.one/f/YwJTA/lailai0916-generate-token-light.png#gh-light-mode-only)![](https://cloud.lailai.one/f/ePQfw/lailai0916-generate-token-dark.png#gh-dark-mode-only)

</ImageWindow>

- 复制并保存这个令牌，以后你将无法再次看到它。

2. 复制 [GitHub Stats Visualization](https://github.com/jstrieb/github-stats) 的 GitHub 仓库。

- 点击 [Create a new repository](https://github.com/jstrieb/github-stats/generate) 创建一个副本，注意不是直接 fork，这样避免了大规模的提交历史。
- **Repository name**（仓库名称）和 **Description**（描述）可以随意填写，例如「`lailai0916/github-stats`」和「`lailai's GitHub Stats`」。
- 点击 **Create repository**（创建仓库）。

<ImageWindow url="https://github.com/new?template_name=github-stats&template_owner=jstrieb">

![](https://cloud.lailai.one/f/Nrjsg/lailai0916-copy-repository-light.png#gh-light-mode-only)![](https://cloud.lailai.one/f/dwbSJ/lailai0916-copy-repository-dark.png#gh-dark-mode-only)

</ImageWindow>

3. 创建完仓库后，会跳转到仓库主页，例如「`https://github.com/lailai0916/github-stats`」。

<ImageWindow url="https://github.com/lailai0916/github-stats">

![](https://cloud.lailai.one/f/55bCb/lailai0916-github-stats-homepage-light.png#gh-light-mode-only)![](https://cloud.lailai.one/f/g8OFJ/lailai0916-github-stats-homepage-dark.png#gh-dark-mode-only)

</ImageWindow>

4. 将访问令牌添加到 Secrets（密钥）。

- 在仓库上方点击 **Settings**（设置）。
- 依次点击 **Secrets and variables** $\to$ **Actions** $\to$ **New repository secret**。

<ImageWindow url="https://github.com/lailai0916/github-stats/settings/secrets/actions">

![](https://cloud.lailai.one/f/EnOi8/lailai0916-setting-secret-light.png#gh-light-mode-only)![](https://cloud.lailai.one/f/ozACB/lailai0916-setting-secret-dark.png#gh-dark-mode-only)

</ImageWindow>

- **Name**（名称）必须填 `ACCESS_TOKEN`，将 **Secret**（密钥）设置为刚才保存的令牌。
- 点击 **Add secret**（添加密钥）。

<ImageWindow url="https://github.com/lailai0916/github-stats/settings/secrets/actions">

![](https://cloud.lailai.one/f/LoatV/lailai0916-add-secret-light.png#gh-light-mode-only)![](https://cloud.lailai.one/f/yxbhP/lailai0916-add-secret-dark.png#gh-dark-mode-only)

</ImageWindow>

5. 配置其他选项（可选）

- 可以通过创建 `EXCLUDED` 和 `EXCLUDED_LANGS` 等密钥来排除特定的仓库或语言。
- 还可以设置环境变量来排除 fork 仓库的统计数据。

6. 首次生成统计图像，以后图像每 24 小时会自动更新。

- 在仓库上方点击 **Actions**。
- 依次点击 **Generate Stats Images** $\to$ **Generate Stats Images** $\to$ **Run workflow**。

<ImageWindow url="https://github.com/lailai0916/github-stats/actions/workflows/main.yml">

![](https://cloud.lailai.one/f/aQjH8/lailai0916-run-workflow-light.png#gh-light-mode-only)![](https://cloud.lailai.one/f/VoyIE/lailai0916-run-workflow-dark.png#gh-dark-mode-only)

</ImageWindow>

- 刷新页面并等待几分钟，直到工作流成功运行。

<ImageWindow url="https://github.com/lailai0916/github-stats/actions">

![](https://cloud.lailai.one/f/JYgun/lailai0916-workflow-success-light.png#gh-light-mode-only)![](https://cloud.lailai.one/f/KPpcJ/lailai0916-workflow-success-dark.png#gh-dark-mode-only)

</ImageWindow>

7. 嵌入状态统计图，并实现深浅模式切换。

```markdown
![](https://raw.githubusercontent.com/lailai0916/github-stats/master/generated/overview.svg#gh-light-mode-only)![](https://raw.githubusercontent.com/lailai0916/github-stats/master/generated/overview.svg#gh-dark-mode-only)
![](https://raw.githubusercontent.com/lailai0916/github-stats/master/generated/languages.svg#gh-light-mode-only)![](https://raw.githubusercontent.com/lailai0916/github-stats/master/generated/languages.svg#gh-dark-mode-only)
```

<BrowserWindow>

![](https://raw.githubusercontent.com/lailai0916/github-stats/master/generated/overview.svg#gh-light-mode-only)![](https://raw.githubusercontent.com/lailai0916/github-stats/master/generated/overview.svg#gh-dark-mode-only)
![](https://raw.githubusercontent.com/lailai0916/github-stats/master/generated/languages.svg#gh-light-mode-only)![](https://raw.githubusercontent.com/lailai0916/github-stats/master/generated/languages.svg#gh-dark-mode-only)

</BrowserWindow>
