# 堆（Heap）

## 参考资料

- [堆简介 - OI Wiki](https://oi-wiki.org/ds/heap/)

## 左偏树

```cpp
struct Node
{
	int val,ls,rs,dis;
}t[N];
int merge(int x,int y)
{
	if(!x||!y)return x|y;
	if(t[x].val>t[y].val||(t[x].val==t[y].val&&x>y))swap(x,y);
	t[x].rs=merge(t[x].rs,y);
	if(t[t[x].ls].dis<t[t[x].rs].dis)swap(t[x].ls,t[x].rs);
	t[x].dis=t[t[x].rs].dis+1;
	return x;
}
```

## pb_ds

```cpp
__gnu_pbds::priority_queue<pair<int,int>,greater<pair<int,int>>> q[N];
```

## 例题

### 洛谷 P3377 【模板】左偏树/可并堆

<Problem id="P3377" />

### 洛谷 P2713 罗马游戏

<Problem id="P2713" />

### 洛谷 P1456 Monkey King

<Problem id="P1456" />

### 洛谷 P10641 BZOJ3252 攻略

<Problem id="P10641" />
