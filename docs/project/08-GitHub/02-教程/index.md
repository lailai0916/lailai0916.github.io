import BrowserWindow from '@site/src/components/BrowserWindow';

# 教程

`username/username` 是一个特别的仓库，它的 README.md 将出现在你个人主页的公共资料上，这个文件可以包含你想要展示的信息，比如关于你自己、你的项目、统计图等。

## 创建仓库

- 打开 [GitHub](https://github.com)，并登录你的账户。

- 在 GitHub 首页右上角点击加号 + 按钮，点击 [New repository](https://github.com/new)（新建仓库）。

1. **Repository name**（仓库名称）必须与你的 GitHub 用户名相同，例如 `lailai0916/lailai0916`（将 `lailai0916` 替换为你的 GitHub 用户名）。
2. **Description**（描述）为可选项，例如 `lailai's Profile`。
3. 勾选 **Add a README file**（添加 README 文件）。
4. 点击 **Create repository**（创建仓库）。

![](assets/create-repository-light.png#gh-light-mode-only)
![](assets/create-repository-dark.png#gh-dark-mode-only)

- 创建完仓库后，会跳转到仓库主页，例如 `https://github.com/lailai0916/lailai0916`。

- 仓库的根目录下有一个 `README.md` 文件，会在你的个人主页展示。

![](assets/repository-homepage-light.png#gh-light-mode-only)
![](assets/repository-homepage-dark.png#gh-dark-mode-only)

- 点击 **Edit README**（编辑 README）编辑文件，完成后点击 **Commit changes**（提交更改）保存文件。

![](assets/edit-readme-light.png#gh-light-mode-only)
![](assets/edit-readme-dark.png#gh-dark-mode-only)

## 标题

- `README.md` 是 Markdown 格式，支持嵌入 HTML 代码。

```html live
<h1 align="center">
  🎉
  <a href="https://www.lailai.one">
    Hello, I'm lailai
  </a>
  🥳
</h1>
```

## 技术栈图标

技术栈图标推荐使用 [Skill Icons](https://skillicons.dev)。

### Skill Icons

以 Markdown 格式嵌入图片。

```markdown
![](https://skillicons.dev/icons?i=js,html,css,wasm)
```

<BrowserWindow>

![](https://skillicons.dev/icons?i=js,html,css,wasm)

</BrowserWindow>

- 通过参数 `&theme=light` 和 `&theme=dark`，可以指定图标的深浅模式。

```markdown
![](https://skillicons.dev/icons?i=java,kotlin,nodejs,figma&theme=light)

![](https://skillicons.dev/icons?i=java,kotlin,nodejs,figma&theme=dark)
```

<BrowserWindow>

![](https://skillicons.dev/icons?i=java,kotlin,nodejs,figma&theme=light)

![](https://skillicons.dev/icons?i=java,kotlin,nodejs,figma&theme=dark)

</BrowserWindow>

- GitHub 有两个特殊标记 `#gh-light-mode-only` 和 `#gh-dark-mode-only`，可以指定某个元素或内容仅在 GitHub 的 Light（亮色）或 Dark（暗色）模式下显示，这样就可以实现深浅模式切换。

```markdown
![](https://skillicons.dev/icons?i=java,kotlin,nodejs,figma&theme=light#gh-light-mode-only)
![](https://skillicons.dev/icons?i=java,kotlin,nodejs,figma&theme=dark#gh-dark-mode-only)
```

<BrowserWindow>

![](https://skillicons.dev/icons?i=java,kotlin,nodejs,figma&theme=light#gh-light-mode-only)
![](https://skillicons.dev/icons?i=java,kotlin,nodejs,figma&theme=dark#gh-dark-mode-only)

</BrowserWindow>

## 状态统计图

GitHub 的状态统计图推荐使用 [GitHub Profile Summary Cards](https://github-profile-summary-cards.vercel.app/demo.html) 或 [GitHub Stats Visualization](https://github.com/jstrieb/github-stats)。

### GitHub Profile Summary Cards

[GitHub Profile Summary Cards](https://github-profile-summary-cards.vercel.app/demo.html) 的优点是方便，直接修改链接即可使用。

```markdown
![](http://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=lailai0916)
```

<BrowserWindow>

![](http://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=lailai0916)

</BrowserWindow>

- 类似技术栈图标，状态统计图也可以实现深浅模式切换。

```markdown
![](http://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=lailai0916&theme=default#gh-light-mode-only)
![](http://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=lailai0916&theme=dark#gh-dark-mode-only)
```

<BrowserWindow>

![](http://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=lailai0916&theme=default#gh-light-mode-only)
![](http://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=lailai0916&theme=dark#gh-dark-mode-only)

</BrowserWindow>

### GitHub Stats Visualization

[GitHub Stats Visualization](https://github.com/jstrieb/github-stats) 的优点是带有动画，但需要自行构建，会相对比较麻烦。

- 创建一个具有 `read:user` 和 `repo` 权限的 **Personal access tokens**（个人访问令牌）。

1. 在 GitHub 首页右上方点击头像，并点击 **Settings**。
2. 依次点击 **Developer settings** $\to$ **Personal access tokens** $\to$ **Tokens (classic)** $\to$ **Generate new token** $\to$ **Generate new token (classic)**。

![](assets/setting-token-light.png#gh-light-mode-only)
![](assets/setting-token-dark.png#gh-dark-mode-only)

3. 建议将 **Expiration**（有效期）设置为 **No expiration**（无有效期）。
4. 在 **Select scopes**（选择范围）中勾选 `read:user` 和 `repo` 权限。
5. 点击 **Create token**（创建令牌）。

![](assets/generate-token-light.png#gh-light-mode-only)
![](assets/generate-token-dark.png#gh-dark-mode-only)

6. 复制并保存这个令牌，以后你将无法再次看到它。

- 复制 GitHub Stats Visualization 的 GitHub 仓库。

1. 点击 [Create a new repository](https://github.com/jstrieb/github-stats/generate) 创建一个副本，注意不是直接 fork，这样避免了大规模的提交历史。
2. **Repository name**（仓库名称）和 **Description**（描述）可以随意填写，例如 `lailai0916/github-stats` 和 `lailai's Github Stats`。
3. 点击 **Create repository**（创建仓库）。

![](assets/copy-repository-light.png#gh-light-mode-only)
![](assets/copy-repository-dark.png#gh-dark-mode-only)

- 创建完仓库后，会跳转到仓库主页，例如 `https://github.com/lailai0916/github-stats`。

![](assets/github-stats-homepage-light.png#gh-light-mode-only)
![](assets/github-stats-homepage-dark.png#gh-dark-mode-only)

- 将访问令牌添加到 Secrets（密钥）。

1. 在仓库上方点击 **Settings**。
2. 依次点击 **Secrets and variables** $\to$ **Actions** $\to$ **New repository secret**。

![](assets/setting-secret-light.png#gh-light-mode-only)
![](assets/setting-secret-dark.png#gh-dark-mode-only)

3. **Name**（名称）必须是 `ACCESS_TOKEN`，将 **Secret**（密钥）设置为刚才保存的令牌。
4. 点击 **Add secret**（添加密钥）。

![](assets/add-secret-light.png#gh-light-mode-only)
![](assets/add-secret-dark.png#gh-dark-mode-only)

- 配置其他选项（可选）

1. 可以通过创建 `EXCLUDED` 和 `EXCLUDED_LANGS` 等密钥来排除特定的仓库或语言。
2. 还可以设置环境变量来排除 fork 仓库的统计数据。

- 首次生成统计图像，以后图像会每24小时自动更新。

1. 在仓库上方点击 **Actions**。
2. 依次点击 **Generate Stats Images** $\to$ **Generate Stats Images** $\to$ **Run workflow**。

![](assets/run-workflow-light.png#gh-light-mode-only)
![](assets/run-workflow-dark.png#gh-dark-mode-only)

3. 刷新页面并等待几分钟，直到工作流运行成功。

![](assets/workflow-success-light.png#gh-light-mode-only)
![](assets/workflow-success-dark.png#gh-dark-mode-only)

- 最后嵌入状态统计图即可。

```markdown
![](https://raw.githubusercontent.com/lailai0916/github-stats/master/generated/overview.svg#gh-dark-mode-only)
![](https://raw.githubusercontent.com/lailai0916/github-stats/master/generated/overview.svg#gh-light-mode-only)
![](https://raw.githubusercontent.com/lailai0916/github-stats/master/generated/languages.svg#gh-dark-mode-only)
![](https://raw.githubusercontent.com/lailai0916/github-stats/master/generated/languages.svg#gh-light-mode-only)
```

<BrowserWindow>

![](https://raw.githubusercontent.com/lailai0916/github-stats/master/generated/overview.svg#gh-dark-mode-only)
![](https://raw.githubusercontent.com/lailai0916/github-stats/master/generated/overview.svg#gh-light-mode-only)
![](https://raw.githubusercontent.com/lailai0916/github-stats/master/generated/languages.svg#gh-dark-mode-only)
![](https://raw.githubusercontent.com/lailai0916/github-stats/master/generated/languages.svg#gh-light-mode-only)

</BrowserWindow>
