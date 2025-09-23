# 教程

本教程将演示如何制作一个简单的终端迷宫游戏：

- 迷宫地图为 $10\times 10$。
- 玩家可以控制角色到达终点。

## 流程

代码的大致流程如下：

```cpp
init();
print();
while(!check())
{
	move();
	print();
}
```

- `init()`：初始化
- `print()`：打印地图
- `check()`：判断结束
- `move()`：玩家移动

## 地图

### 创建地图

定义一个常量 $N=10$，表示迷宫地图的大小。

再定义一个 $N\times N$ 的数组 $a$ 存储地图。

```cpp
const int N=10;
int a[N][N];
```

此时我们可以随意编写地图，并赋予数字意义：

- $0$：空地（可以经过）。
- $1$：墙壁（无法经过）。

```cpp
int a[N][N]=
{
	{1,1,1,1,1,1,1,1,1,1},
	{1,0,0,0,0,0,0,0,0,1},
	{1,1,1,0,1,0,1,1,1,1},
	{1,0,0,0,1,0,0,0,0,1},
	{1,0,1,0,1,1,1,1,0,1},
	{1,0,1,0,0,0,0,0,0,1},
	{1,0,1,0,1,0,1,1,0,1},
	{1,0,0,0,1,0,1,1,0,1},
	{1,0,1,0,1,0,0,0,0,1},
	{1,1,1,1,1,1,1,1,1,1}
};
```

### 打印地图（`print()`）

打印地图，先清空屏幕，再逐行输出数组即可。

```cpp
void print()
{
	system("cls");
	for(int i=0;i<N;i++)
	{
		for(int j=0;j<N;j++)
		{
			printf("%d ",a[i][j]);
		}
		printf("\n");
	}
}
```

## 玩家

### 创建玩家

定义两个变量 $x$ 和 $y$，表示玩家当前的坐标为 $(x,y)$。

```cpp
int x,y;
```

### 初始化（`init()`）

将玩家位置设置为出生点 $(1,1)$。

```cpp
void init()
{
	x=1;
	y=1;
}
```

## 事件

### 判断结束

返回玩家位置是否在目标点 $(8,8)$。

```cpp
bool check()
{
	return x==8&&y==8;
}
```

### 玩家移动

将 $x,y$ 备份为 $x_1,y_1$。

然后使用 `getch()` 函数读取一个字符。

```cpp
int x1=x,y1=y;
char f=getch();
```

:::tip

`getch()` 相比直接输入，不需要按回车键，可以减少玩家操作复杂度。

`getch()` 函数需要头文件 `#include <conio.h>`

:::

分别判断 $f$ 是否为 `w`、`a`、`s` 和 `d`。

如果是某个字符，将 $x_1$ 或 $y_1$ 移动 $1$。

判断 $a_{x_1,y_1}$ 是否等于 $0$。

如果是，就让 $x,y$ 等于 $x_1,y_1$。

## 完整代码

```cpp
咕.
```

## 工具函数

### system 函数

`system()` 函数是 C++ 标准库中的一个函数，用于执行系统命令。

调用操作系统的命令行或 shell 来执行指定的命令。

#### `system("title XXX")`

- 功能：修改终端窗口标题为 `XXX`。

```cpp
system("title Game");
```

#### `system("mode con cols=XX lines=YY")`

- 功能：修改终端窗口大小为 `YY` 行 `XX` 列。

```cpp
system("mode con cols=60 lines=30");
```

#### `system("cls")`

- 功能：清空整个终端。

```cpp
system("cls");
```

### Windows API

Windows API 是微软提供的一套用于与 Windows 操作系统进行交互的编程接口，允许开发者通过 C++ 语言访问和操作操作系统的底层功能，如窗口管理、文件操作、网络通信等。

#### `gotoxy(short x,short y)`

功能：设置控制台光标的位置为 `y` 行 `x` 列。

```cpp
void gotoxy(short x,short y)
{
	SetConsoleCursorPosition(GetStdHandle(STD_OUTPUT_HANDLE),{x,y});
}
```

#### `hideCursor()`

- 功能：隐藏控制台中的光标。

```cpp
void hideCursor()
{
	CONSOLE_CURSOR_INFO cursor_info={1,0};
	SetConsoleCursorInfo(GetStdHandle(STD_OUTPUT_HANDLE),&cursor_info);
}
```

#### `disableQuickEditMode()`

- 功能：禁用快速编辑模式。

```cpp
void disableQuickEditMode()
{
	HANDLE hInput=GetStdHandle(STD_INPUT_HANDLE);
	DWORD prevMode;
	GetConsoleMode(hInput,&prevMode);
	prevMode&=~ENABLE_QUICK_EDIT_MODE;
	prevMode&=~ENABLE_INSERT_MODE;
	prevMode&=~ENABLE_MOUSE_INPUT;
	SetConsoleMode(hInput,prevMode);
}
```

#### `windowPos()`

- 功能：获取鼠标指针在控制台的相对位置。

```cpp
POINT windowPos()
{
	POINT pt;
	GetCursorPos(&pt);
	ScreenToClient(GetConsoleWindow(),&pt);
	return pt;
}
```

#### `moveConsoleWindow(int x,int y)`

功能：将控制台窗口移动 `x` 和 `y` 个单位。

```cpp
void moveConsoleWindow(int x,int y)
{
	HWND consoleWindow=GetConsoleWindow();
	RECT rect;
	GetWindowRect(consoleWindow,&rect);
	int w=rect.right-rect.left,h=rect.bottom-rect.top;
	MoveWindow(consoleWindow,rect.left+x,rect.top+y,w,h,TRUE);
}
```

#### `centerConsoleWindow()`

- 功能：将控制台窗口居中显示在屏幕上。

```cpp
void centerConsoleWindow()
{
	HWND consoleWindow=GetConsoleWindow();
	RECT rect;
	GetWindowRect(consoleWindow,&rect);
	int w=rect.right-rect.left,h=rect.bottom-rect.top;
	int x=GetSystemMetrics(SM_CXSCREEN)-w>>1;
	int y=GetSystemMetrics(SM_CYSCREEN)-h>>1;
	MoveWindow(consoleWindow,x,y,w,h,TRUE);
}
```

### 按键检测

#### `KEY_DOWN(VK_NONAME)`

- 功能：检测某个按键是否被按下。

```cpp
#define KEY_DOWN(VK_NONAME) ((GetAsyncKeyState(VK_NONAME)&0x8000)?1:0)
```

### 颜色

终端不仅只有黑白的显示，还可以支持多种颜色。

#### system 函数

通过 `system("color XY")`，可以设置终端文本的背景色和前景色。

其中，`X` 表示背景色，`Y` 表示前景色，它们都是十六进制数字（$0\sim 15$），每个数字对应一种颜色。

| 数字 | 颜色 |             数值             | 数字 |  颜色  |             数值             |
| :--: | :--: | :--------------------------: | :--: | :----: | :--------------------------: |
| $0$  | 黑色 | $\textcolor{000000}{000000}$ | $8$  |  灰色  | $\textcolor{808080}{808080}$ |
| $1$  | 蓝色 | $\textcolor{000080}{000080}$ | $9$  | 亮蓝色 | $\textcolor{0000ff}{0000ff}$ |
| $2$  | 绿色 | $\textcolor{008000}{008000}$ | $10$ | 亮绿色 | $\textcolor{00ff00}{00ff00}$ |
| $3$  | 青色 | $\textcolor{008080}{008080}$ | $11$ | 亮青色 | $\textcolor{00ffff}{00ffff}$ |
| $4$  | 红色 | $\textcolor{800000}{800000}$ | $12$ | 亮红色 | $\textcolor{ff0000}{ff0000}$ |
| $5$  | 紫色 | $\textcolor{800080}{800080}$ | $13$ | 亮紫色 | $\textcolor{ff00ff}{ff00ff}$ |
| $6$  | 黄色 | $\textcolor{808000}{808000}$ | $14$ | 亮黄色 | $\textcolor{ffff00}{ffff00}$ |
| $7$  | 白色 | $\textcolor{c0c0c0}{c0c0c0}$ | $15$ | 亮白色 | $\textcolor{ffffff}{ffffff}$ |

`system` 函数的缺点是只能修改整个终端的颜色，无法仅修改特定部分的文字颜色。

#### Windows API

如果你需要只修改某一段文字的颜色，可以使用 Windows API 来实现。

定义一个 `color` 函数，传入两个参数 `a` 和 `b`，表示背景色和前景色的颜色编号，对应的颜色与 `system` 函数相同。

```cpp
void color(short a,short b)
{
	SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE),a<<4|b);
}
```

Windows API 的缺点是颜色种类有限（只有 $16$ 种）。

#### ANSI 转义序列

ANSI 转义序列支持 $24$ 位真彩色，也就是常见的 RGB 颜色格式。

但此功能默认未开启，需启用虚拟终端处理。

```cpp
void enableVirtualTerminalProcessing()
{
	HANDLE hConsole=GetStdHandle(STD_OUTPUT_HANDLE);
	DWORD dwMode=0;
	GetConsoleMode(hConsole,&dwMode);
	dwMode|=ENABLE_VIRTUAL_TERMINAL_PROCESSING;
	SetConsoleMode(hConsole,dwMode);
}
```

定义两个 `color` 函数，传入三个参数 `r`、`g` 和 `b`，表示 RGB 颜色值。

```cpp
void foreColor(int r,int g,int b)
{
	printf("\033[38;2;%d;%d;%dm",r,g,b);
}
void backColor(int r,int g,int b)
{
	printf("\033[48;2;%d;%d;%dm",r,g,b);
}
```
