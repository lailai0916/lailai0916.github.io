import BrowserWindow from '@site/src/components/BrowserWindow';

# lailai0916

要在 GitHub 个人主页的介绍中添加内容，你可以通过编辑 Profile README 来实现。GitHub 允许你在个人主页上显示一个特殊的 README 文件，这个文件可以包含你想要展示的信息，比如关于你自己、你的项目、统计图等。

lailai0916/lailai0916 is a special repository.

Its README.md will appear on your public profile.

lailai0916/lailai0916 is a ✨special ✨ repository that you can use to add a README.md to your GitHub profile. Make sure it’s public and initialize it with a README to get started.

## 创建仓库

- 打开 [GitHub](https://github.com)，并登录你的账户。

- 在 GitHub 首页点击右上角的 + 按钮，选择 [New repository](https://github.com/new)（新建仓库）。

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

- `README.md` 是 Markdown 格式，且支持嵌入 HTML 代码。

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

- 技术栈的图标推荐使用 [Skill Icons](https://skillicons.dev)。

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

## 状态信息

- GitHub 的状态信息推荐使用 [GitHub Profile Summary Cards](https://github-profile-summary-cards.vercel.app/demo.html) 或 [GitHub Stats Visualization](https://github.com/jstrieb/github-stats)。

### GitHub Profile Summary Cards

- [GitHub Profile Summary Cards](https://github-profile-summary-cards.vercel.app/demo.html) 的优点是方便，修改链接即可直接使用。

```markdown
![](http://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=lailai0916&theme=default)
```

<BrowserWindow>

![](http://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=lailai0916&theme=default)

</BrowserWindow>

- 类似技术栈图标，也可以实现深浅模式切换。

```markdown
![](http://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=lailai0916&theme=default#gh-light-mode-only)
![](http://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=lailai0916&theme=dark#gh-dark-mode-only)
```

<BrowserWindow>

![](http://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=lailai0916&theme=default#gh-light-mode-only)
![](http://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=lailai0916&theme=dark#gh-dark-mode-only)

</BrowserWindow>

### GitHub Stats Visualization

- [GitHub Stats Visualization](https://github.com/jstrieb/github-stats) 的优点是带有动画，但需要自行构建比较麻烦。
