# 代码对拍器

## 结构

```bash
checker
├── main.bat                       # 批处理脚本
├── lite.bat                       # 批处理脚本（轻量版）
├── lite.sh                        # 批处理脚本（Shell 版）
├── gen.exe                        # 数据生成器
├── std.exe                        # 标准程序
└── sol.exe                        # 被测试的程序
```

:::warning

所有程序请 **不要** 添加文件读写。

:::

## 代码

### main.bat

```bash title="main.bat"
@echo off
setlocal enabledelayedexpansion
set num=0
set inFile=data\data.in
set ansFile=data\data.ans
set outFile=data\data.out

if not exist data (
    mkdir data
)

:loop
	set /a num+=1
	gen.exe > %inFile%
	std.exe < %inFile% > %ansFile%
	sol.exe < %inFile% > %outFile%
	fc %outFile% %ansFile% > nul 2>&1 || (
		powershell -command "Write-Host '>>> Failure #!num!' -f Red"
		powershell -command "Write-Host '>>> data.in' -f Yellow"
		type %inFile%
		powershell -command "Write-Host '>>> data.ans' -f Yellow"
		type %ansFile%
		powershell -command "Write-Host '>>> data.out' -f Yellow"
		type %outFile%
		goto end
	)
	powershell -command "Write-Host '>>> Success #!num!' -f Green"
	goto loop

:end
pause > nul
```

### lite.bat

```bash title="lite.bat"
@echo off
setlocal enabledelayedexpansion
set num=0

:loop
	set /a num+=1
	gen.exe > in
	std.exe < in > ans
	sol.exe < in > out
	fc out ans > nul 2>&1 || (
		echo Failure #%num%
		fc out ans
		goto end
	)
	echo Success #%num%
	goto loop

:end
pause > nul
```

### lite.sh

```bash
#!/bin/bash

num=0
while true; do
  num=$((num + 1))
  ./gen > in
  ./std < in > ans
  ./sol < in > out
  diff out ans > /dev/null
  if [ $? -ne 0 ]; then
    echo "Failure #$num"
    diff out ans
    break
  fi
  echo "Success #$num"
done
```

### gen.cpp

```cpp title="gen.cpp"
#include <bits/stdc++.h>
using namespace std;

random_device rd;
mt19937 gen(rd());
int Rand(int x,int y)
{
	uniform_int_distribution<int> dist(x,y);
	return dist(gen);
}
int main()
{
	// do sth
	return 0;
}
```
