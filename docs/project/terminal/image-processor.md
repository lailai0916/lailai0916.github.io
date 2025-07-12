# 图片处理器

## 视频合成

将生成的图片合成视频。

### 安装

```bash
brew install ffmpeg
```

### 运行

```bash
ffmpeg -framerate 30 -i %05d.ppm -c:v libx264 -r 30 -pix_fmt yuv420p test.mp4
```

## 图片生成器

```cpp
#include <bits/stdc++.h>
using namespace std;

void init()
{
	system("title Image Generator");
}
const int N=1024;
const int M=1024;
const int H=1;
int a[N][M][3];
void write(int id)
{
	string tmp=to_string(id);
	tmp.insert(tmp.begin(),5-tmp.length(),'0');
	ofstream fout("test/"+tmp+".ppm",ios::out|ios::binary);
	if(!fout.is_open())return;
	fout<<"P6"<<'\n'<<M<<' '<<N<<'\n'<<255<<'\n';
	for(int i=0;i<N;i++)
	{
		for(int j=0;j<M;j++)
		{
			fout.put(a[i][j][0]&255);
			fout.put(a[i][j][1]&255);
			fout.put(a[i][j][2]&255);
		}
	}
	fout.close();
}
void gen(int id)
{
	random_device rd;
	mt19937 gen(rd());
	uniform_int_distribution<int> dist(0,255);
	for(int i=0;i<N;i++)
	{
		for(int j=0;j<M;j++)
		{
			int k=i+j&1;
			a[i][j][0]=k?0:0;
			a[i][j][1]=k?255:0;
			a[i][j][2]=k?0:255;
		}
	}
}
void task(int id)
{
	gen(id);
	write(id);
	cout<<"#"<<id<<'\n';
}
int main()
{
	init();
	for(int i=0;i<H;i++)
	{
		task(i);
	}
	return 0;
}
```

## 图片显示器

```cpp
#include <bits/stdc++.h>
#include <windows.h>
using namespace std;

void gotoxy(short x,short y)
{
	SetConsoleCursorPosition(GetStdHandle(STD_OUTPUT_HANDLE),{x,y});
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
void enableVirtualTerminalProcessing()
{
	HANDLE hConsole=GetStdHandle(STD_OUTPUT_HANDLE);
	DWORD dwMode=0;
	GetConsoleMode(hConsole,&dwMode);
	dwMode|=ENABLE_VIRTUAL_TERMINAL_PROCESSING;
	SetConsoleMode(hConsole,dwMode);
}
void backColor(int r,int g,int b)
{
	printf("\033[48;2;%d;%d;%dm",r,g,b);
}
void init()
{
	setConsoleFont(1,1);
	system("title Image Display");
	system("mode con cols=2048 lines=1024");
	enableVirtualTerminalProcessing();
	centerConsoleWindow();
	disableQuickEditMode();
	hideCursor();
}
const int N=1024;
const int M=1024;
const int H=1;
int a[N][M][3];
void read(int id)
{
	string tmp=to_string(id);
	tmp.insert(tmp.begin(),5-tmp.length(),'0');
	ifstream fin("test/"+tmp+".ppm",ios::in|ios::binary);
	if(!fin.is_open())return;
	string header;
	fin>>header;
	if(header!="P6")return;
	int m,n,h;
	fin>>m>>n>>h;
	fin.ignore();
	for(int i=0;i<n;i++)
	{
		for(int j=0;j<m;j++)
		{
			a[i][j][0]=fin.get()*255/h;
			a[i][j][1]=fin.get()*255/h;
			a[i][j][2]=fin.get()*255/h;
		}
	}
	fin.close();
}
void print()
{
	for(int i=0;i<N;i++)
	{
		for(int j=0;j<M;j++)
		{
			gotoxy(j<<1,i);
			backColor(a[i][j][0],a[i][j][1],a[i][j][2]);
			printf("  ");
		}
	}
}
void task(int id)
{
	read(id);
	print();
}
int main()
{
	init();
	for(int i=0;i<H;i++)
	{
		task(i);
	}
	return 0;
}
```
