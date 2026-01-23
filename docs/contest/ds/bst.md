---
title: '二叉搜索树 & 平衡树'
---

## 参考资料

- [二叉搜索树 & 平衡树 - OI Wiki](https://oi-wiki.org/ds/bst/)

## `__gnu_pbds::tree`

```cpp
#include <bits/extc++.h>
using namespace __gnu_pbds;
tree<pair<int,int>,null_type,less<pair<int,int>>,rb_tree_tag,tree_order_statistics_node_update> T;
```

## 笛卡尔树

```cpp
int top=0;
s[++top]=0;
for(int i=1;i<=n;i++)
{
	while(top&&a[s[top]]>a[i])son[i][0]=s[top--];
	if(s[top])son[s[top]][1]=i;
	s[++top]=i;
}
```

## 例题

<Problem id="P3369" />

<Problem id="P6136" />

<Problem id="P5854" />
