# Windows API

Windows API 是微软提供的一套用于与 Windows 操作系统进行交互的编程接口，允许开发者通过 C++ 语言访问和操作操作系统的底层功能，如窗口管理、文件操作、网络通信等。

## `gotoxy(short x,short y)`

功能：设置控制台光标的位置为 `y` 行 `x` 列。

```cpp
void gotoxy(short x,short y)
{
	SetConsoleCursorPosition(GetStdHandle(STD_OUTPUT_HANDLE),{x,y});
}
```

## `hideCursor()`

- 功能：隐藏控制台中的光标。

```cpp
void hideCursor()
{
	CONSOLE_CURSOR_INFO cursor_info={1,0};
	SetConsoleCursorInfo(GetStdHandle(STD_OUTPUT_HANDLE),&cursor_info);
}
```

## `disableQuickEditMode()`

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

## `windowPos()`

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

## `moveConsoleWindow(int x,int y)`

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

## `centerConsoleWindow()`

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

