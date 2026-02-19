---
title: 'iGame'
---

一款使用 C++ 开发的终端小游戏合集，包含多种经典玩法。

## 前言

我第一次接触文本编程时使用的 IDE 是 [Dev-C++](https://zh.wikipedia.org/wiki/Dev-C%2B%2B)，并且在接下来的很长一段时间里，我一直在使用它。

在学习算法的过程中，我也萌生了制作游戏的想法。

所以我从很早以前就想开发一款大型的终端游戏。

然而相比于图形化编程，终端界面显得十分简陋。

虽然终端只能输出字符，做游戏比较局限，但它的上限却非常高。

## 待办事项

[TODO]

更新预告：

- [ ] 结算界面
- [ ] 联机模式
- [ ] 账号登录
- [ ] 钢琴块游戏
- [ ] 设置界面
- [ ] 动画优化
- [ ] 五子棋优化
- [ ] 血量条
- [ ] 能量块
- [ ] 敌人显示

## 更新日志

可能要烂尾了，以后随缘更新吧……

### iGame 1.0 Beta 5

2024 年 10 月 12 日

- 优化 窗口位置
- 优化 「震动」功能
- 优化 读写文件
- 新增 登录界面
- 优化 按钮效果

### iGame 1.0 Beta 4

2024 年 10 月 3 日

- 新增 「迷宫」模式「智能寻路」
- 新增 地图方块「路线标记」（`*`）
- 优化 「迷宫」模式地图生成算法性能
- 新增 日志系统 Beta

### iGame 1.0 Beta 3

2024 年 9 月 30 日

- 优化 「五子棋」结束判定机制
- 优化 主页「按钮」判定位置
- 新增 主页「刷新」功能

### iGame 1.0 Beta 2

2024 年 9 月 27 日

- 新增 「迷宫」模式
- 新增 地图方块「得分点」（`x` 和 `X`）
- 新增 地图参数 `score`
- 移除 地图参数 `name`
- 新增 主页「震动」功能

### iGame 1.0 Beta 1

2024 年 9 月 26 日

- 新增 初始版本

## 代码

:::tip

请使用正确的格式打开源代码。

:::

```cpp title="编译命令"
-std=c++17 -lws2_32
```

```cpp title="main.cpp"
#include <bits/stdc++.h>
#include <windows.h>
#define KEY_DOWN(VK_NONAME) ((GetAsyncKeyState(VK_NONAME)&0x8000)?1:0)
using namespace std;

const int SCREEN_SIZE=19;
namespace Tool
{
	int font_x,font_y;
	void gotoxy(short x,short y)
	{
		SetConsoleCursorPosition(GetStdHandle(STD_OUTPUT_HANDLE),{x,y});
	}
	void color(short a,short b)
	{
		SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE),a<<4|b);
	}
	POINT windowPos()
	{
		POINT pt;
		GetCursorPos(&pt);
		ScreenToClient(GetConsoleWindow(),&pt);
		return pt;
	}
	void getFontSize()
	{
		HANDLE hConsole=GetStdHandle(STD_OUTPUT_HANDLE);
		COORD fontSize=GetConsoleFontSize(hConsole,0);
		font_x=fontSize.X;
		font_y=fontSize.Y;
	}
	void moveConsoleWindow(int x,int y)
	{
		HWND consoleWindow=GetConsoleWindow();
		RECT rect;
		GetWindowRect(consoleWindow,&rect);
		int w=rect.right-rect.left;
		int h=rect.bottom-rect.top;
		MoveWindow(consoleWindow,rect.left+x,rect.top+y,w,h,TRUE);
	}
	void centerConsoleWindow()
	{
		HWND consoleWindow=GetConsoleWindow();
		RECT rect;
		GetWindowRect(consoleWindow,&rect);
		int w=rect.right-rect.left;
		int h=rect.bottom-rect.top;
		int x=(GetSystemMetrics(SM_CXSCREEN)-w)/2;
		int y=(GetSystemMetrics(SM_CYSCREEN)-h)/2;
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
	void hideCursor()
	{
		CONSOLE_CURSOR_INFO cursor_info={1,0};
		SetConsoleCursorInfo(GetStdHandle(STD_OUTPUT_HANDLE),&cursor_info);
	}
	void init()
	{
		system("title iGame 1.0");
		system("mode con cols=68 lines=25");
		centerConsoleWindow();
		disableQuickEditMode();
		hideCursor();
		getFontSize();
	}
}
using namespace Tool;
namespace Logger
{
	string fileName;
	void init()
	{
		auto now=chrono::system_clock::now();
		time_t now_time=chrono::system_clock::to_time_t(now);
		auto ms=chrono::duration_cast<chrono::milliseconds>(now.time_since_epoch())%1000;
		tm* ltm=localtime(&now_time);
		stringstream timeStream;
		timeStream<<put_time(ltm,"%Y-%m-%d-%H-%M-%S");
		fileName=timeStream.str();
	}
	string getTime()
	{
		auto now=chrono::system_clock::now();
		time_t now_time=chrono::system_clock::to_time_t(now);
		auto ms=chrono::duration_cast<chrono::milliseconds>(now.time_since_epoch())%1000;
		tm* ltm=localtime(&now_time);
		stringstream timeStream;
		timeStream<<put_time(ltm,"%Y-%m-%d %H:%M:%S");
		timeStream<<'.'<<setfill('0')<<setw(3)<<ms.count();
		return timeStream.str();
	}
	void log(string message,string level)
	{
		string dir=".\\data\\logs\\"+fileName+".log";
		ofstream fout(dir,ios::app);
		if(!fout.is_open())
		{
			system("cls");
			cerr<<"[ERROR] cannot open the log!"<<'\n';
			exit(0);
		}
		fout<<'['<<getTime()<<']'<<' '<<'['<<level<<']'<<' '<<message<<'\n';
		fout.close();
	}
	void Info(string message)
	{
		log(message,"INFO");
	}
	void Debug(string message)
	{
		log(message,"DEBUG");
	}
	void Error(string message)
	{
		log(message,"ERROR");
		exit(0);
	}
}
namespace Widget
{
	class Button
	{
		private:
			string text;
			int x,y,w,h;
			bool frame;
			int step,co;
			bool checkHover()
			{
				POINT pt=windowPos();
				int x1=(x+1)*font_x,y1=y*font_y+font_y/2;
				int x2=x1+(w+1)*font_x*2,y2=y1+(h+1)*font_y;
				return x1<=pt.x&&pt.x<=x2&&y1<=pt.y&&pt.y<=y2;
			}
		public:
			Button()
			{
				text="Unnamed";
				x=y=w=h=0;
				frame=1;
				step=co=0;
			}
			Button(int _x,int _y,int _w,int _h,bool _f=1,string _t="Unnamed")
			{
				text=_t;
				x=_x;y=_y;w=_w;h=_h;
				frame=_f;
				step=co=0;
			}
			void print(int c=7)
			{
				color(0,c);
				if(frame)
				{
					gotoxy(x,y);printf("┌ ");for(int i=1;i<=w;i++)printf("─ ");printf("┐ ");
					for(int i=1;i<=h;i++){gotoxy(x,y+i);printf("│ ");gotoxy(x+w*2+2,y+i);printf("│ ");}
					gotoxy(x,y+h+1);printf("└ ");for(int i=1;i<=w;i++)printf("─ ");printf("┘ ");
				}
				else
				{
					gotoxy(x+2,y+1);printf("%s",text.c_str());
				}
				color(0,7);
			}
			bool update(bool key=0)
			{
				bool click=0;
				bool hover=checkHover()||key;
				bool press=KEY_DOWN(MOUSE_MOVED)||KEY_DOWN(VK_SPACE)||key;
				if(!hover)step=0;
				else
				{
					if(step==0&&!press)step=1;
					if(step==1&&press)step=2;
					if(step==2&&!press)
					{
						step=0;
						click=1;
					}
				}
				int tmp=hover?(press?6:14):7;
				if(tmp!=co)
				{
					co=tmp;
					print(co);
				}
				return click;
			}
	};
}
namespace Frame
{
	void icon()
	{
		gotoxy(10,9);color(0,12);printf("●");
		gotoxy(8,10);color(0,9);printf("●");

		gotoxy(26,9);color(0,12);printf("●");
		gotoxy(24,10);color(0,9);printf("●");

		gotoxy(40,9);color(6,0);printf("╋ ");
		gotoxy(42,9);color(6,7);printf("●");
		gotoxy(40,10);color(6,0);printf("●");
		gotoxy(42,10);color(6,0);printf("╋ ");

		gotoxy(56,9);color(8,0);printf("  ");
		gotoxy(58,9);color(8,0);printf("  ");
		gotoxy(56,10);color(8,0);printf("~~");
		gotoxy(58,10);color(8,0);printf("~~");

		gotoxy(8,17);color(8,0);printf("<>");
		gotoxy(10,17);color(8,0);printf("<>");
		gotoxy(8,18);color(8,0);printf("<>");
		gotoxy(10,18);color(8,0);printf("<>");

		gotoxy(24,17);color(8,0);printf("<>");
		gotoxy(26,17);color(8,0);printf("<>");
		gotoxy(24,18);color(8,0);printf("<>");
		gotoxy(26,18);color(8,0);printf("<>");

		gotoxy(40,17);color(0,12);printf("■");
		gotoxy(42,17);color(0,10);printf("■");
		gotoxy(40,18);color(0,9);printf("■");
		gotoxy(42,18);color(0,6);printf("■");

		gotoxy(56,17);color(8,0);printf("┌ ");
		gotoxy(58,17);color(8,0);printf("┐ ");
		gotoxy(56,18);color(8,0);printf("└ ");
		gotoxy(58,18);color(8,0);printf("┘ ");

		color(0,7);
	}
	void frame(string name)
	{
		color(0,7);
		if(name=="title")
		{
			gotoxy(0,0);
			printf("┌─────────────────────────────────────────────────────────────────┐ \n");
			printf("│                            iGame  1.0                           │ \n");
		}
		else if(name=="home")
		{
			gotoxy(0,2);
			printf("├───┬─────────────────────────────────────┬───────────────────────┤ \n");
			printf("│   │                                     │   月  日 周     :  :  │ \n");
			printf("├───┴─────────────────────────────────────┴───────────────────────┤ \n");
			printf("│                                                                 │ \n");
			printf("│                                                                 │ \n");
			printf("│                                                                 │ \n");
			printf("│                                                                 │ \n");
			printf("│                                                                 │ \n");
			printf("│                                                                 │ \n");
			printf("│                                                                 │ \n");
			printf("│       地图            迷宫           五子棋           震动      │ \n");
			printf("│                                                                 │ \n");
			printf("│                                                                 │ \n");
			printf("│                                                                 │ \n");
			printf("│                                                                 │ \n");
			printf("│                                                                 │ \n");
			printf("│                                                                 │ \n");
			printf("│                                                                 │ \n");
			printf("│      编辑器          编辑器          颜色表           退出      │ \n");
			printf("│                                                                 │ \n");
			printf("│                                                                 │ \n");
			printf("│                                                                 │ \n");
			printf("└─────────────────────────────────────────────────────────────────┘ ");
			icon();
		}
		else if(name=="game")
		{
			gotoxy(0,2);
			printf("├────────────┬───────────────────────────────────────┬────────────┤ \n");
			printf("│            │                                       │      :     │ \n");
			printf("│            │                                       ├────────────┤ \n");
			printf("│            │                                       │            │ \n");
			printf("│            │                                       │    blood   │ \n");
			printf("│            │                                       │            │ \n");
			printf("│            │                                       │    score   │ \n");
			printf("│            │                                       │            │ \n");
			printf("│            │                                       │            │ \n");
			printf("│            │                                       ├────────────┤ \n");
			printf("│            │                                       │  (   ,   ) │ \n");
			printf("│            │                                       │  floor:    │ \n");
			printf("│            │                                       ├────────────┤ \n");
			printf("│            │                                       │            │ \n");
			printf("│            │                                       │    ■   ■ │ \n");
			printf("│            │                                       │  ■■■ ■ │ \n");
			printf("│            │                                       │            │ \n");
			printf("│            │                                       ├────────────┤ \n");
			printf("│            │                                       │       %    │ \n");
			printf("│            │                                       │            │ \n");
			printf("├────────────┴───────────────────────────────────────┴────────────┤ \n");
			printf("│                                                                 │ \n");
			printf("└─────────────────────────────────────────────────────────────────┘ ");
		}
		else if(name=="editor")
		{
			gotoxy(0,2);
			printf("├──────────┬───────────────────────────────────────────┬──────────┤ \n");
			printf("│          │                                           │          │ \n");
			printf("│          │                                           │          │ \n");
			printf("│          │                                           │          │ \n");
			printf("│          │                                           │          │ \n");
			printf("│          │                                           │          │ \n");
			printf("│          │                                           │          │ \n");
			printf("│          │                                           │          │ \n");
			printf("│          │                                           │          │ \n");
			printf("│          │                                           │          │ \n");
			printf("│          │                                           │          │ \n");
			printf("│          │                                           │          │ \n");
			printf("│          │                                           │          │ \n");
			printf("│          │                                           │          │ \n");
			printf("│          │                                           │          │ \n");
			printf("│          │                                           │          │ \n");
			printf("│          │                                           │          │ \n");
			printf("│          │                                           │          │ \n");
			printf("│          │                                           │          │ \n");
			printf("│          │                                           │          │ \n");
			printf("│          │                                           │          │ \n");
			printf("│          │                                           │          │ \n");
			printf("└──────────┴───────────────────────────────────────────┴──────────┘ ");
		}
		else if(name=="gomoku")
		{
			gotoxy(0,2);
			printf("├────────────┬───────────────────────────────────────┬────────────┤ \n");
			printf("│            │                                       │            │ \n");
			printf("│            │                                       │            │ \n");
			printf("│            │                                       │            │ \n");
			printf("│            │                                       │            │ \n");
			printf("│            │                                       │            │ \n");
			printf("│            │                                       │            │ \n");
			printf("│            │                                       │            │ \n");
			printf("│            │                                       │            │ \n");
			printf("│            │                                       │            │ \n");
			printf("│            │                                       │            │ \n");
			printf("│            │                                       │            │ \n");
			printf("│            │                                       │            │ \n");
			printf("│            │                                       │            │ \n");
			printf("│            │                                       │            │ \n");
			printf("│            │                                       │            │ \n");
			printf("│            │                                       │            │ \n");
			printf("│            │                                       │            │ \n");
			printf("│            │                                       │            │ \n");
			printf("│            │                                       │            │ \n");
			printf("├────────────┴───────────────────────────────────────┴────────────┤ \n");
			printf("│                                                                 │ \n");
			printf("└─────────────────────────────────────────────────────────────────┘ ");
		}
		else if(name=="empty")
		{
			gotoxy(0,2);
			printf("├─────────────────────────────────────────────────────────────────┤ \n");
			printf("│                                                                 │ \n");
			printf("│                                                                 │ \n");
			printf("│                                                                 │ \n");
			printf("│                                                                 │ \n");
			printf("│                                                                 │ \n");
			printf("│                                                                 │ \n");
			printf("│                                                                 │ \n");
			printf("│                                                                 │ \n");
			printf("│                                                                 │ \n");
			printf("│                                                                 │ \n");
			printf("│                                                                 │ \n");
			printf("│                                                                 │ \n");
			printf("│                                                                 │ \n");
			printf("│                                                                 │ \n");
			printf("│                                                                 │ \n");
			printf("│                                                                 │ \n");
			printf("│                                                                 │ \n");
			printf("│                                                                 │ \n");
			printf("│                                                                 │ \n");
			printf("│                                                                 │ \n");
			printf("│                                                                 │ \n");
			printf("└─────────────────────────────────────────────────────────────────┘ ");
		}
		else Logger::Error("cannot find the frame!");
	}
}
namespace Duel
{
	const int dh[2]={1,-1};
	const int dx[8]={0,-1,0,1,-1,-1,1,1};
	const int dy[8]={-1,0,1,0,-1,1,1,-1};
	const int KEY_NUMBER=6;
	const int KEY[KEY_NUMBER]={'A','W','D','S',VK_UP,VK_DOWN};
	const double SPEED=30;
	const double FPS=120;
	struct Map
	{
		int time,score;
		int size_h,size_x,size_y;
		int born_h,born_x,born_y;
		vector<vector<vector<char>>> a;
		Map():time(0),score(100),size_h(0),size_x(0),size_y(0),born_h(0),born_x(0),born_y(0),a(){}
	};
	struct Part
	{
		int h,x,y;
		double speed;
		int blood,score;
		Part():h(0),x(0),y(0),speed(SPEED),blood(100),score(0){}
	};
	struct Screen
	{
		clock_t time;
		char s[SCREEN_SIZE][SCREEN_SIZE];
		bool k[KEY_NUMBER];
		Screen():time(0)
		{
			memset(s,0,sizeof s);
			memset(k,0,sizeof k);
		}
	};
	struct Point
	{
		int h,x,y;
		Point():h(0),x(0),y(0){}
		Point(int _h,int _x,int _y):h(_h),x(_x),y(_y){}
	};
	void draw(char f)
	{
		switch(f)
		{
			case '@':color(0,9);printf("●");break;
			case '.':color(0,7);printf("  ");break;
			case '$':color(15,0);printf("  ");break;
			case '#':color(0,7);printf("■");break;
			case '^':color(8,0);printf("  ");break;
			case 'x':color(0,7);printf("★");break;
			case 'X':color(0,9);printf("★");break;
			case '*':color(6,0);printf("  ");break;
			default:color(0,7);printf("XX");break;
		}
		color(0,7);
	}
	namespace File
	{
		void readMap(Map &tmp,string path)
		{
			ifstream fin(path,ios::in);
			if(!fin.is_open())Logger::Error("cannot read the map!");
			string s;
			while(fin>>s)
			{
				if(s=="/time")fin>>tmp.time;
				else if(s=="/score")fin>>tmp.score;
				else if(s=="/size")
				{
					fin>>tmp.size_h>>tmp.size_x>>tmp.size_y;
					tmp.a.resize(tmp.size_h,vector<vector<char>>(tmp.size_x,vector<char>(tmp.size_y,'.')));
				}
				else if(s=="/born")fin>>tmp.born_h>>tmp.born_x>>tmp.born_y;
				else if(s=="/map")
				{
					string line;
					getline(fin,line);
					for(int k=0;k<tmp.size_h;k++)
					{
						for(int i=0;i<tmp.size_x;i++)
						{
							getline(fin,line);
							for(int j=0;j<min(tmp.size_y,(int)line.size());j++)
							{
								tmp.a[k][i][j]=line[j];
							}
						}
					}
				}
			}
			fin.close();
		}
		void writeMap(Map tmp,string path)
		{
			ofstream fout(path,ios::out);
			if(!fout.is_open())Logger::Error("cannot write the map!");
			fout<<"/time"<<' '<<tmp.time<<'\n';
			fout<<"/score"<<' '<<tmp.score<<'\n';
			fout<<"/size"<<' '<<tmp.size_h<<' '<<tmp.size_x<<' '<<tmp.size_y<<'\n';
			fout<<"/born"<<' '<<tmp.born_h<<' '<<tmp.born_x<<' '<<tmp.born_y<<'\n';
			fout<<"/map"<<'\n';
			for(int k=0;k<tmp.size_h;k++)
			{
				for(int i=0;i<tmp.size_x;i++)
				{
					for(int j=0;j<tmp.size_y;j++)
					{
						fout<<tmp.a[k][i][j];
					}
					fout<<'\n';
				}
			}
			fout.close();
		}
		filesystem::path dir=".\\data\\maps";
		map<string,Map> mapData;
		void getMap(Map &tmp,string name)
		{
			if(mapData.find(name)==mapData.end())Logger::Error("cannot find the map!");
			tmp=mapData[name];
		}
		void saveMap(Map tmp,string name)
		{
			mapData[name]=tmp;
		}
		void readData()
		{
			if(!exists(dir)||!is_directory(dir))Logger::Error("cannot find the directory!");
			filesystem::directory_iterator it(dir);
			for(auto entry:it)readMap(mapData[entry.path().filename().string()],entry.path().string());
		}
		void writeData()
		{
			if(!exists(dir)||!is_directory(dir))Logger::Error("cannot find the directory!");
			filesystem::directory_iterator it(dir);
			for(auto entry:it)writeMap(mapData[entry.path().filename().string()],entry.path().string());
		}
	}
	namespace Maze
	{
		const int H=1;
		const int X=100;
		const int Y=100;
		const int MAZE_H=H*2-1;
		const int MAZE_X=X*2+1;
		const int MAZE_Y=Y*2+1;
		const int MAP_H=MAZE_H;
		const int MAP_X=MAZE_X*2-1;
		const int MAP_Y=MAZE_Y*2-1;
		vector<vector<vector<char>>> Data(MAZE_H,vector<vector<char>>(MAZE_X,vector<char>(MAZE_Y,'#')));
		void init()
		{
			for(int k=0;k<MAZE_H;k++)
			{
				for(int i=0;i<MAZE_X;i++)
				{
					for(int j=0;j<MAZE_Y;j++)
					{
						Data[k][i][j]='#';
					}
				}
			}
			Data[0][1][1]='.';
		}
		void bfs(unsigned int seed)
		{
			mt19937 gen(seed);
			vector<pair<Point,int>> v;
			v.push_back(make_pair(Point(0,1,2),2));
			v.push_back(make_pair(Point(0,2,1),3));
			while(!v.empty())
			{
				uniform_int_distribution<> d(0,v.size()-1);
				int k=d(gen);
				auto [p,f]=v[k];
				swap(v[k],v.back());
				v.pop_back();
				int h1=p.h,x1=p.x+dx[f],y1=p.y+dy[f];
				if(Data[h1][x1][y1]=='.')continue;
				Data[h1][x1][y1]=Data[h1][p.x][p.y]='.';
				for(int i=0;i<4;i++)
				{
					int h2=h1,x2=x1+dx[i],y2=y1+dy[i];
					if(h2>=0&&h2<MAZE_H&&x2>0&&x2<MAZE_X-1&&y2>0&&y2<MAZE_Y-1)
					{
						v.push_back(make_pair(Point(h2,x2,y2),i));
					}
				}
			}
		}
		void getMap(string name,unsigned int seed)
		{
			init();
			bfs(seed);
			Map tmp;
			tmp.time=1800;tmp.score=1;
			tmp.size_h=MAP_H;tmp.size_x=MAP_X;tmp.size_y=MAP_Y;
			tmp.born_h=0;tmp.born_x=2;tmp.born_y=2;
			tmp.a.resize(tmp.size_h,vector<vector<char>>(tmp.size_x,vector<char>(tmp.size_y)));
			for(int k=0;k<tmp.size_h;k++)
			{
				for(int i=0;i<tmp.size_x;i++)
				{
					for(int j=0;j<tmp.size_y;j++)
					{
						tmp.a[k][i][j]=i%4==0||j%4==0?'#':'.';
					}
				}
			}
			for(int k=0;k<MAZE_H;k++)
			{
				for(int i=0;i<MAZE_X;i++)
				{
					for(int j=0;j<MAZE_Y;j++)
					{
						if(Data[k][i][j]=='#')continue;
						if(i%2==1&&j%2==0)
						{
							tmp.a[k][i*2-1][j*2]=tmp.a[k][i*2][j*2]=tmp.a[k][i*2+1][j*2]='.';
						}
						else if(i%2==0&&j%2==1)
						{
							tmp.a[k][i*2][j*2-1]=tmp.a[k][i*2][j*2]=tmp.a[k][i*2][j*2+1]='.';
						}
					}
				}
			}
			tmp.a[MAP_H-1][MAP_X-3][MAP_Y-3]='x';
			File::saveMap(tmp,name);
		}
	}
	namespace Game
	{
		Map nowMap;
		Part player;
		vector<Screen> screen;
		int Count,px;
		bool checkRange(int h,int x,int y)
		{
			return h>=0&&h<nowMap.size_h&&x>=0&&x<nowMap.size_x&&y>=0&&y<nowMap.size_y;
		}
		bool checkMove(int h,int x,int y)
		{
			return checkRange(h,x,y)&&nowMap.a[h][x][y]!='$'&&nowMap.a[h][x][y]!='#';
		}
		bool checkEnd()
		{
			return (!screen.empty()&&clock()-screen[0].time>=nowMap.time*1000)||player.blood<=0||player.score>=nowMap.score;
		}
		void move()
		{
			bool k[KEY_NUMBER];
			for(int i=0;i<KEY_NUMBER;i++)k[i]=screen[Count].k[i];
			if(k[0]&&k[2])k[0]=k[2]=0;
			if(k[1]&&k[3])k[1]=k[3]=0;
			if(k[4]&&k[5])k[4]=k[5]=0;
			bool op1[8]={k[0],k[1],k[2],k[3],k[0]&&k[1],k[1]&&k[2],k[2]&&k[3],k[3]&&k[0]};
			for(int i=7;i>=0;i--)
			{
				if(!op1[i])continue;
				if(!checkMove(player.h,player.x+dx[i],player.y+dy[i]))continue;
				if(checkMove(player.h,player.x+dx[i],player.y)||checkMove(player.h,player.x,player.y+dy[i]))
				{
					player.x+=dx[i];
					player.y+=dy[i];
					break;
				}
			}
			bool op2[2]={k[4],k[5]};
			for(int i=0;i<2;i++)
			{
				if(!op2[i])continue;
				if(!checkMove(player.h+dh[i],player.x,player.y))continue;
				if(nowMap.a[player.h][player.x][player.y]=='^'&&nowMap.a[player.h+dh[i]][player.x][player.y]=='^')
				{
					player.h+=dh[i];
					break;
				}
			}
			if(nowMap.a[player.h][player.x][player.y]=='x')
			{
				nowMap.a[player.h][player.x][player.y]='X';
				player.score++;
			}
		}
		char look(int h,int x,int y)
		{
			if(!checkRange(h,x,y))return '$';
			return nowMap.a[h][x][y];
		}
		void printMap()
		{
			int w=SCREEN_SIZE>>1;
			for(int i=-w;i<=w;i++)
			{
				for(int j=-w;j<=w;j++)
				{
					screen[Count].s[i+w][j+w]=(i==0&&j==0)?'@':look(player.h,player.x+i,player.y+j);
					if(screen[Count].s[i+w][j+w]!=screen[Count-1].s[i+w][j+w])
					{
						gotoxy(j*2+33,i+12);
						draw(screen[Count].s[i+w][j+w]);
					}
				}
			}
		}
		bool printDot;
		void printInfo()
		{
			int remainder=nowMap.time*1000-(screen[Count].time-screen[0].time);
			if(remainder<60000)
			{
				gotoxy(58,3);printf("%02d",remainder/1000%60);
				if(!printDot){gotoxy(60,3);printf(".");printDot=1;}
				gotoxy(61,3);printf("%02d",remainder%1000/10);
			}
			else
			{
				gotoxy(58,3);printf("%02d",remainder/1000/60);
				if(printDot){gotoxy(60,3);printf(":");printDot=0;}
				gotoxy(61,3);printf("%02d",remainder/1000%60);
			}
			gotoxy(59,7);printf("%03d",player.blood);
			gotoxy(57,9);printf("%03d",player.score);
			gotoxy(57,12);printf("%03d",player.x);
			gotoxy(61,12);printf("%03d",player.y);
			gotoxy(63,13);printf("%02d",player.h+1);
			int w=min(ceil(FPS),30.0);
			double fps=Count>w?(w*1000.0)/(screen[Count].time-screen[Count-w].time):FPS;
			gotoxy(59,20);printf("%02d",player.speed>0?(int)min(px*100.0/max(Count,1),99.0):0);
			gotoxy(58,21);printf("%05.1lf",fps);
			pair<int,int> p[KEY_NUMBER]={{56,17},{58,16},{60,17},{58,17},{63,16},{63,17}};
			for(int i=0;i<KEY_NUMBER;i++)
			{
				if(screen[Count].k[i]!=screen[Count-1].k[i])
				{
					color(0,screen[Count].k[i]?6:7);
					gotoxy(p[i].first,p[i].second);
					printf("■");
				}
			}
			color(0,7);
		}
		namespace AI
		{
			void init()
			{
				for(int i=-2;i<=2;i++)
				{
					for(int j=-2;j<=2;j++)
					{
						int h1=player.h,x1=player.x+i,y1=player.y+j;
						if(!checkRange(h1,x1,y1))continue;
						if(nowMap.a[h1][x1][y1]=='*')nowMap.a[h1][x1][y1]='.';
					}
				}
			}
			void bfs()
			{
				vector<vector<vector<int>>> vis(nowMap.size_h,vector<vector<int>>(nowMap.size_x,vector<int>(nowMap.size_y,-1)));
				vis[player.h][player.x][player.y]=0;
				queue<Point> q;
				q.push({player.h,player.x,player.y});
				while(!q.empty())
				{
					auto [h,x,y]=q.front();
					q.pop();
					if(nowMap.a[h][x][y]=='x'||nowMap.a[h][x][y]=='X'||nowMap.a[h][x][y]=='*')
					{
						while(!(x==player.x&&y==player.y))
						{
							int f=vis[h][x][y];
							x-=dx[f];y-=dy[f];
							if(nowMap.a[h][x][y]=='.')nowMap.a[h][x][y]='*';
							if(max(abs(x-player.x),abs(y-player.y))<=1)break;
						}
						return;
					}
					for(int i=0;i<4;i++)
					{
						int h1=h,x1=x+dx[i],y1=y+dy[i];
						if(!checkMove(h1,x1,y1))continue;
						if(!(x1%4==2||y1%4==2))continue;
						if(vis[h1][x1][y1]==-1)
						{
							vis[h1][x1][y1]=i;
							q.push({h1,x1,y1});
						}
					}
				}
			}
			void run()
			{
				init();
				bfs();
			}
		}
		void func(string name)
		{
			if(name=="maze")AI::run();
		}
		void init()
		{
			Count=px=0;
			printDot=0;
			player.h=nowMap.born_h;
			player.x=nowMap.born_x;
			player.y=nowMap.born_y;
			player.speed=SPEED;
			player.blood=100;
			player.score=0;
			screen.clear();
			Frame::frame("game");
			gotoxy(60,9);printf("/%03d",nowMap.score);
		}
		void run(string name)
		{
			File::getMap(nowMap,name);
			init();
			func(name);
			while(!checkEnd()&&!KEY_DOWN(VK_ESCAPE))
			{
				screen.resize(Count+1);
				screen[Count].time=clock();
				if(Count)
				{
					for(int i=0;i<KEY_NUMBER;i++)screen[Count].k[i]=KEY_DOWN(KEY[i]);
					if(player.speed<0||px*1000<=(clock()-screen[0].time)*player.speed){move();px++;}
					func(name);
					printMap();
					printInfo();
				}
				while(clock()-screen[0].time<Count*1000/FPS);
				Count++;
			}
		}
	}
	namespace Editor
	{
		Map nowMap;
		Part player;
		Screen screen;
		bool checkScreen(int x,int y)
		{
			return x>=0&&x<SCREEN_SIZE&&y>=0&&y<SCREEN_SIZE;
		}
		bool checkRange(int h,int x,int y)
		{
			return h>=0&&h<nowMap.size_h&&x>=0&&x<nowMap.size_x&&y>=0&&y<nowMap.size_y;
		}
		bool checkMove(int h,int x,int y)
		{
			return h>=0&&h<nowMap.size_h&&x>-SCREEN_SIZE&&x<nowMap.size_x&&y>-SCREEN_SIZE&&y<nowMap.size_y;
		}
		void move()
		{
			bool k[KEY_NUMBER];
			for(int i=0;i<KEY_NUMBER;i++)k[i]=screen.k[i];
			if(k[0]&&k[2])k[0]=k[2]=0;
			if(k[1]&&k[3])k[1]=k[3]=0;
			if(k[4]&&k[5])k[4]=k[5]=0;
			bool op1[8]={k[0],k[1],k[2],k[3],k[0]&&k[1],k[1]&&k[2],k[2]&&k[3],k[3]&&k[0]};
			for(int i=7;i>=0;i--)
			{
				if(!op1[i])continue;
				if(checkMove(player.h,player.x+dx[i],player.y+dy[i]))
				{
					player.x+=dx[i];
					player.y+=dy[i];
					return;
				}
			}
			bool op2[2]={k[4],k[5]};
			for(int i=0;i<2;i++)
			{
				if(!op2[i])continue;
				if(checkMove(player.h+dh[i],player.x,player.y))
				{
					player.h+=dh[i];
					return;
				}
			}
		}
		char look(int h,int x,int y)
		{
			if(!checkRange(h,x,y))return '$';
			return nowMap.a[h][x][y];
		}
		void printMap()
		{
			gotoxy(15,3);
			for(int i=0;i<SCREEN_SIZE;i++)printf("%02d",((player.y+i)%100+100)%100);
			for(int i=0;i<SCREEN_SIZE;i++)
			{
				gotoxy(13,i+4);printf("%02d",((player.x+i)%100+100)%100);
				for(int j=0;j<SCREEN_SIZE;j++)
				{
					char f=look(player.h,player.x+i,player.y+j);
					if(f!=screen.s[i][j])
					{
						gotoxy(j*2+15,i+4);
						draw(f);
						screen.s[i][j]=f;
					}
				}
				gotoxy(SCREEN_SIZE*2+15,i+4);printf("%02d",((player.x+i)%100+100)%100);
			}
			gotoxy(15,SCREEN_SIZE+4);
			for(int i=0;i<SCREEN_SIZE;i++)printf("%02d",((player.y+i)%100+100)%100);
		}
		void init()
		{
			player.h=player.x=player.y=0;
			screen=Screen();
			Frame::frame("editor");
			printMap();
		}
		void run(string name)
		{
			File::getMap(nowMap,name);
			init();
			while(!KEY_DOWN(VK_ESCAPE))
			{
				for(int i=0;i<KEY_NUMBER;i++)screen.k[i]=KEY_DOWN(KEY[i]);
				move();
				printMap();
				POINT pt=windowPos();
				int px=pt.y/font_y-4,py=(pt.x-font_x)/(font_x*2)-7;
				gotoxy(57,3);printf("(%03d,%03d)",min(max(player.x+px,0),nowMap.size_x-1),min(max(player.y+py,0),nowMap.size_y-1));
				if(checkScreen(px,py)&&checkRange(player.h,player.x+px,player.y+py))
				{
					char f;
					if(KEY_DOWN(VK_SPACE))f='.';
					else if(KEY_DOWN('1'))f='#';
					else if(KEY_DOWN('2'))f='$';
					else if(KEY_DOWN('3'))f='^';
					else if(KEY_DOWN('4'))f='x';
					else continue;
					screen.s[px][py]=nowMap.a[player.h][player.x+px][player.y+py]=f;
					gotoxy(py*2+15,px+4);draw(f);
				}
			}
			File::saveMap(nowMap,name);
		}
	}
}
namespace Gomoku
{
	const int dx[4]={1,0,1,1};
	const int dy[4]={0,1,1,-1};
	const int STYLE_NUMBER=3;
	const string styleData[STYLE_NUMBER][11]=
	{
		{"●","●","┌ ","┐ ","└ ","┘ ","┬ ","┴ ","├ ","┤ ","┼ "},
		{"●","●","┏ ","┓ ","┗ ","┛ ","┳ ","┻ ","┣ ","┫ ","╋ "},
		{"●","●","╔ ","╗ ","╚ ","╝ ","╦ ","╩ ","╠ ","╣ ","╬ "}
	};
	int board[SCREEN_SIZE][SCREEN_SIZE];
	int style;
	bool now,press;
	bool checkRange(int x,int y)
	{
		return x>=0&&x<SCREEN_SIZE&&y>=0&&y<SCREEN_SIZE;
	}
	bool checkMove(int x,int y)
	{
		return checkRange(x,y)&&board[x][y]==-1;
	}
	bool checkEnd()
	{
		bool full=1;
		for(int i=0;i<SCREEN_SIZE;i++)
		{
			for(int j=0;j<SCREEN_SIZE;j++)
			{
				if(board[i][j]==-1){full=0;continue;}
				for(int p=0;p<4;p++)
				{
					bool ok=1;
					for(int k=-2;k<=2;k++)
					{
						int x=i+k*dx[p],y=j+k*dy[p];
						if(!(checkRange(x,y)&&board[x][y]==board[i][j]))ok=0;
					}
					if(ok)return 1;
				}
			}
		}
		return full;
	}
	void draw(int x,int y)
	{
		gotoxy(y*2+15,x+3);
		if(board[x][y]==0){color(6,0);printf("%s",styleData[style][0].c_str());}
		else if(board[x][y]==1){color(6,7);printf("%s",styleData[style][1].c_str());}
		else if(board[x][y]==-1)
		{
			color(6,0);
			if(x==0&&y==0)printf("%s",styleData[style][2].c_str());
			else if(x==0&&y==SCREEN_SIZE-1)printf("%s",styleData[style][3].c_str());
			else if(x==SCREEN_SIZE-1&&y==0)printf("%s",styleData[style][4].c_str());
			else if(x==SCREEN_SIZE-1&&y==SCREEN_SIZE-1)printf("%s",styleData[style][5].c_str());
			else if(x==0)printf("%s",styleData[style][6].c_str());
			else if(x==SCREEN_SIZE-1)printf("%s",styleData[style][7].c_str());
			else if(y==0)printf("%s",styleData[style][8].c_str());
			else if(y==SCREEN_SIZE-1)printf("%s",styleData[style][9].c_str());
			else printf("%s",styleData[style][10].c_str());
		}
		color(0,7);
	}
	void printBoard()
	{
		for(int i=0;i<SCREEN_SIZE;i++)
		{
			for(int j=0;j<SCREEN_SIZE;j++)
			{
				draw(i,j);
			}
		}
	}
	void updateStyle()
	{
		for(int i=0;i<STYLE_NUMBER;i++)
		{
			if(style!=i&&KEY_DOWN(VK_F1+i))
			{
				style=i;
				printBoard();
				break;
			}
		}
	}
	void updateBoard()
	{
		POINT pt=windowPos();
		int px=pt.y/font_y-3,py=(pt.x-font_x)/(font_x*2)-7;
		bool p=KEY_DOWN(MOUSE_MOVED)||KEY_DOWN(VK_SPACE);
		if(checkMove(px,py)&&p&&!press)
		{
			board[px][py]=now;
			draw(px,py);
			now=!now;
		}
		press=p;
	}
	void init()
	{
		style=0;
		now=0;
		press=1;
		memset(board,-1,sizeof board);
		Frame::frame("gomoku");
		printBoard();
	}
	void run()
	{
		init();
		while(!checkEnd()&&!KEY_DOWN(VK_ESCAPE))
		{
			updateStyle();
			updateBoard();
		}
	}
}
namespace colorTable
{
	const int lailaiAvatar[5][5]={{2,4,2,4,1},{1,3,4,4,1},{3,2,0,1,3},{1,2,1,4,2},{2,2,4,3,1}};
	bool press;
	void printColorTable()
	{
		gotoxy(18,4);printf("颜色表");
		gotoxy(6,6);for(int i=0;i<16;i++)printf("%02d",i);
		for(int i=0;i<16;i++)
		{
			gotoxy(4,i+7);printf("%02d",i);
			for(int j=0;j<16;j++)
			{
				gotoxy(j*2+6,i+7);
				color(i,j);printf("■");color(0,7);
			}
		}
	}
	void draw(int a)
	{
		if(a==0){color(15,0);printf("Ｌ");}
		else if(a==1){color(12,0);printf("  ");}
		else if(a==2){color(10,0);printf("  ");}
		else if(a==3){color(9,0);printf("  ");}
		else if(a==4){color(14,0);printf("  ");}
		color(0,7);
	}
	void printAvatar(int x,int y)
	{
		for(int i=0;i<5;i++)
		{
			for(int j=0;j<5;j++)
			{
				gotoxy(y+j*2,x+i);
				if(!press)printf("  ");
				else draw(lailaiAvatar[i][j]);
			}
		}
		gotoxy(y+2,x+5);printf(press?"lailai":"      ");
	}
	void init()
	{
		press=0;
		Frame::frame("empty");
		printColorTable();
	}
	void run()
	{
		init();
		while(!KEY_DOWN(VK_ESCAPE))
		{
			bool p=KEY_DOWN(VK_SPACE);
			if(p!=press)
			{
				press=p;
				printAvatar(17,47);
			}
		}
	}
}
namespace Refresh
{
	void run()
	{
		getFontSize();
	}
}
namespace Shake
{
	void run()
	{
		for(int i=0;i<7;i++)
		{
			Sleep(1);moveConsoleWindow(-3,0);
			Sleep(1);moveConsoleWindow(3,0);
			Sleep(1);moveConsoleWindow(3,0);
			Sleep(1);moveConsoleWindow(-3,0);
		}
	}
}
namespace Home
{
	namespace Time
	{
		const string weekDays[7]={"日","一","二","三","四","五","六"};
		const int TIME_NUMBER=6;
		pair<int,int> p[TIME_NUMBER]={{44,3},{48,3},{55,3},{58,3},{61,3},{64,3}};
		int Data[TIME_NUMBER];
		void init()
		{
			memset(Data,-1,sizeof Data);
		}
		void update()
		{
			time_t now=time(nullptr);
			tm *ltm=localtime(&now);
			int Tmp[TIME_NUMBER]={ltm->tm_mon+1,ltm->tm_mday,ltm->tm_wday,ltm->tm_hour,ltm->tm_min,ltm->tm_sec};
			for(int i=0;i<TIME_NUMBER;i++)
			{
				if(Tmp[i]==Data[i])continue;
				Data[i]=Tmp[i];
				gotoxy(p[i].first,p[i].second);
				if(i==2)printf("%s",weekDays[Data[i]].c_str());
				else printf("%02d",Data[i]);
			}
		}
	}
	const int BUTTON_NUMBER=9;
	Widget::Button button[BUTTON_NUMBER]=
	{
		Widget::Button(6,8,2,2),
		Widget::Button(22,8,2,2),
		Widget::Button(38,8,2,2),
		Widget::Button(54,8,2,2),
		Widget::Button(6,16,2,2),
		Widget::Button(22,16,2,2),
		Widget::Button(38,16,2,2),
		Widget::Button(54,16,2,2),
		Widget::Button(0,2,1,1,0,"■")
	};
	void init()
	{
		Time::init();
		Frame::frame("home");
		for(int i=0;i<BUTTON_NUMBER;i++)button[i].print();
	}
	void run()
	{
		init();
		Duel::File::readData();
		Duel::Maze::getMap("maze",114514);
		while(1)
		{
			Time::update();
			int ok=-1;
			for(int i=0;i<BUTTON_NUMBER;i++)
			{
				if(button[i].update(i==8&&KEY_DOWN(VK_F5)))
				{
					switch(i)
					{
						case 0:Duel::Game::run("map0");break;
						case 1:Duel::Game::run("maze");break;
						case 2:Gomoku::run();break;
						case 3:Shake::run();break;
						case 4:Duel::Editor::run("map0");break;
						case 5:Duel::Editor::run("maze");break;
						case 6:colorTable::run();break;
						case 7:return;
						case 8:Refresh::run();break;
					}
					ok=i;
					break;
				}
			}
			if(ok!=-1&&ok!=3&&ok!=8)init();
		}
		Duel::File::writeData();
	}
}
namespace Begin
{
	const int BUTTON_NUMBER=2;
	Widget::Button button[BUTTON_NUMBER]=
	{
		Widget::Button(12,9,5,5),
		Widget::Button(42,9,5,5)
	};
	void init()
	{
		Frame::frame("empty");
		gotoxy(15,17);printf("账号登录");
		gotoxy(45,17);printf("游客登录");
		for(int i=0;i<BUTTON_NUMBER;i++)button[i].print();
	}
	void run()
	{
		init();
		while(1)
		{
			int ok=-1;
			for(int i=0;i<BUTTON_NUMBER;i++)
			{
				if(button[i].update())
				{
					switch(i)
					{
						case 0:break;
						case 1:Home::run();break;
					}
					ok=i;
					break;
				}
			}
			if(ok==1)init();
		}
	}
}
int main()
{
	init();
	Logger::init();
	Frame::frame("title");
	Begin::run();
	return 0;
}
```
