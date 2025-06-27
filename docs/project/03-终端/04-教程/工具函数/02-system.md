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
