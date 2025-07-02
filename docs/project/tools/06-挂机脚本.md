# 挂机脚本

我的游戏挂机脚本，可执行简单的重复点击操作。

采用 AppleScript 编写，仅适用于 macOS 系统。

## 安装

```bash
brew install cliclick
```

## 代码

```applescript title="script.scpt"
repeat
	delay 5
	do shell script "/opt/homebrew/bin/cliclick m:540,360 c:."
	delay 5
	do shell script "/opt/homebrew/bin/cliclick m:1180,600 c:."
end repeat
```

## 运行

```bash
osascript script.scpt
```
