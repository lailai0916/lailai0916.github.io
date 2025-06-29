:::info[[LibreOJ #4. Quine](https://loj.ac/p/4)]

写一个程序，使其能输出自己的源代码。代码中必须至少包含十个可见字符。

:::

```cpp
#include<cstdio>
char *s={"#include<cstdio>%cchar *s={%c%s%c};%cint main(){printf(s,10,34,s,34,10);return 0;}"};
int main(){printf(s,10,34,s,34,10);return 0;}
```
