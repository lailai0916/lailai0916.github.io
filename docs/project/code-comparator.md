# 代码对拍器

一个用于信息学奥林匹克竞赛（OI）的轻量级代码对拍器。

## 参考资料

- [CYaRon：测试数据生成利器 - 洛谷](https://www.luogu.com.cn/discuss/11410)

## 项目链接

<GitHub repo="lailai0916/code-comparator" />

## 对拍简介

对拍是一种验证代码正确性的方法。它通过编写两份代码：一份是待验证的代码，另一份是已知正确但效率较低的暴力解法。

代码对拍器会自动生成随机数据并处理，比较两份代码的输出结果，以判断待验证代码的正确性。

## 项目结构

```bash
code-comparator
├── main.bat                       # 批处理脚本
├── lite.bat                       # 批处理脚本（轻量版）
├── lite.sh                        # 批处理脚本（Shell 版）
├── gen.cpp                        # 数据生成器源代码
├── std.cpp                        # 标准程序源代码
├── sol.cpp                        # 待测程序源代码
├── gen.exe                        # 数据生成器
├── std.exe                        # 标准程序
└── sol.exe                        # 待测程序
```

:::warning

所有 C++ 程序请勿使用文件读写操作。

:::
