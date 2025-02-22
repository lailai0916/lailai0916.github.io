# system 函数

`system()` 函数是 C++ 标准库中的一个函数，用于执行系统命令。

调用操作系统的命令行或 shell 来执行指定的命令。

## `system("title XXX")`

- 功能：修改终端窗口标题为 `XXX`。

```cpp
system("title Game");
```

## `system("mode con cols=XX lines=YY")`

- 功能：修改终端窗口大小为 `YY` 行 `XX` 列。

```cpp
system("mode con cols=60 lines=30");
```

## `system("cls")`

- 功能：清空整个终端。

```cpp
system("cls");
```

## `system("color XY")`

- 功能：修改终端文本的前景色为 `X`、背景色为 `Y`。
- 参数：`X` 和 `Y` 是 $0\sim 15$ 的整数。

| 数字 | 颜色 |             数值              | 数字 |  颜色  |             数值              |
| :--: | :--: | :---------------------------: | :--: | :----: | :---------------------------: |
| $0$  | 黑色 | $\color{000000}\text{000000}$ | $8$  |  灰色  | $\color{808080}\text{808080}$ |
| $1$  | 蓝色 | $\color{000080}\text{000080}$ | $9$  | 亮蓝色 | $\color{0000FF}\text{0000FF}$ |
| $2$  | 绿色 | $\color{008000}\text{008000}$ | $10$ | 亮绿色 | $\color{00FF00}\text{00FF00}$ |
| $3$  | 青色 | $\color{008080}\text{008080}$ | $11$ | 亮青色 | $\color{00FFFF}\text{00FFFF}$ |
| $4$  | 红色 | $\color{800000}\text{800000}$ | $12$ | 亮红色 | $\color{FF0000}\text{FF0000}$ |
| $5$  | 紫色 | $\color{800080}\text{800080}$ | $13$ | 亮紫色 | $\color{FF00FF}\text{FF00FF}$ |
| $6$  | 黄色 | $\color{808000}\text{808000}$ | $14$ | 亮黄色 | $\color{FFFF00}\text{FFFF00}$ |
| $7$  | 白色 | $\color{C0C0C0}\text{C0C0C0}$ | $15$ | 亮白色 | $\color{FFFFFF}\text{FFFFFF}$ |

```cpp
system("color A1");
```

