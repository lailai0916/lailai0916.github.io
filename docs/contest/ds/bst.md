# 二叉搜索树 & 平衡树

## 参考资料

- [二叉搜索树 & 平衡树 - OI Wiki](https://oi-wiki.org/ds/bst/)

## `__gnu_pbds::tree`

```cpp
#include <bits/extc++.h>
using namespace __gnu_pbds;
__gnu_pbds::tree<pair<int,int>,null_type,less<pair<int,int>>,rb_tree_tag,tree_order_statistics_node_update> T;
```

## 例题

### 洛谷 P3369 【模板】普通平衡树

<Problem id="P3369" />
