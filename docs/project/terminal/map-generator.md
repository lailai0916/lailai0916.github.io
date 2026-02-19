---
title: '地图生成器'
---

一种原创的地图生成算法。

## 算法

算法思路：

1. 灵感来源于《我的世界》游戏，在地图上随机生成水和岩浆。
2. 水和岩浆会向四周扩散，其中水的流动速度是岩浆的 $2$ 倍。
3. 水和岩浆相遇时，会生成固定的边界。
4. 所有物体停止运动，地图生成完毕。

## 代码

```cpp
#include <bits/stdc++.h>
#include <windows.h>
#define KEY_DOWN(VK_NONAME) ((GetAsyncKeyState(VK_NONAME)&0x8000)?1:0)
using namespace std;

const int N=100;
const int dx[4]={-1,0,1,0};
const int dy[4]={0,-1,0,1};
int a[N][N],s[N][N];
void gotoxy(short x,short y)
{
	SetConsoleCursorPosition(GetStdHandle(STD_OUTPUT_HANDLE),{x,y});
}
void color(short a,short b)
{
	SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE),a<<4|b);
}
void hideCursor()
{
	CONSOLE_CURSOR_INFO cursor_info={1,0};
	SetConsoleCursorInfo(GetStdHandle(STD_OUTPUT_HANDLE),&cursor_info);
}
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
void setConsoleFont(int x,int y)
{
	HANDLE hConsole=GetStdHandle(STD_OUTPUT_HANDLE);
	CONSOLE_FONT_INFOEX fontInfoEx;
	fontInfoEx.cbSize=sizeof(CONSOLE_FONT_INFOEX);
	GetCurrentConsoleFontEx(hConsole,FALSE,&fontInfoEx);
	fontInfoEx.dwFontSize.X=x;
	fontInfoEx.dwFontSize.Y=y;
	wcscpy_s(fontInfoEx.FaceName,L"Consolas");
	SetCurrentConsoleFontEx(hConsole,FALSE,&fontInfoEx);
}
void init()
{
	setConsoleFont(8,8);
	system("title Map Generator");
	system("mode con cols=200 lines=100");
	centerConsoleWindow();
	disableQuickEditMode();
	hideCursor();
}
void gen()
{
	memset(a,0,sizeof a);
	random_device rd;
	mt19937 gen(rd());
	uniform_int_distribution<int> dist(1,200);
	for(int i=0;i<N;i++)
	{
		for(int j=0;j<N;j++)
		{
			int k=dist(gen);
			if(k==1)a[i][j]=1;
			else if(k==2)a[i][j]=2;
		}
	}
}
bool find(int i,int j,int t)
{
	for(int k=0;k<4;k++)
	{
		int x=i+dx[k],y=j+dy[k];
		if(x<0||x>=N||y<0||y>=N)continue;
		if(a[x][y]==t)return 1;
	}
	return 0;
}
void run()
{
	bool t=0;
	while(1)
	{
		t^=1;
		for(int i=0;i<N;i++)
		{
			for(int j=0;j<N;j++)
			{
				bool b=find(i,j,1),r=find(i,j,2);
				if(a[i][j]==0)
				{
					if(b==1&&r==1)a[i][j]=-3;
					else if(b==1)a[i][j]=-1;
					else if(r==1&&t==0)a[i][j]=-2;
				}
				if(a[i][j]==2&&b==1)a[i][j]=-3;
			}
		}
		bool tmp=1;
		for(int i=0;i<N;i++)
		{
			for(int j=0;j<N;j++)
			{
				if(a[i][j]<0)tmp=0;
				a[i][j]=abs(a[i][j]);
			}
		}
		if(tmp)break;
	}
	for(int i=0;i<N;i++)
	{
		for(int j=0;j<N;j++)
		{
			if(a[i][j]==0||(a[i][j]==3&&!find(i,j,2)))a[i][j]=1;
		}
	}
}
void draw(int f)
{
	if(f==0)color(7,0);
	else if(f==1)color(9,0);
	else if(f==2)color(12,0);
	else if(f==3)color(8,0);
	printf("  ");color(0,7);
}
void print()
{
	for(int i=0;i<N;i++)
	{
		for(int j=0;j<N;j++)
		{
			if(s[i][j]==a[i][j])continue;
			gotoxy(j*2,i);
			draw(s[i][j]=a[i][j]);
		}
	}
}
int main()
{
	init();
	while(1)
	{
		gen();
		run();
		print();
		while(!KEY_DOWN(VK_SPACE));
	}
	return 0;
}
```
