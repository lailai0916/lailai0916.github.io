# 线段树

## 参考资料

- [线段树 - OI Wiki](https://oi-wiki.org/ds/seg/)

## 实现

```cpp
struct SEG
{
	ll a[N],val[N<<2],tag[N<<2];
	void gx(int u,ll v,int len){val[u]+=v*len;tag[u]+=v;}
	void push_up(int u){val[u]=val[ls]+val[rs];}
	void push_down(int u,int l,int r)
	{
		gx(ls,tag[u],mid-l+1);
		gx(rs,tag[u],r-mid);
		tag[u]=0;
	}
	void build(int u,int l,int r)
	{
		if(l==r){val[u]=a[l];return;}
		build(ls,l,mid);
		build(rs,mid+1,r);
		push_up(u);
	}
	void update(int u,int l,int r,int x,int y,ll v)
	{
		if(x<=l&&r<=y){gx(u,v,r-l+1);return;}
		push_down(u,l,r);
		if(x<=mid)update(ls,l,mid,x,y,v);
		if(y>mid)update(rs,mid+1,r,x,y,v);
		push_up(u);
	}
	ll query(int u,int l,int r,int x,int y)
	{
		if(x<=l&&r<=y)return val[u];
		push_down(u,l,r);
		ll res=0;
		if(x<=mid)res+=query(ls,l,mid,x,y);
		if(y>mid)res+=query(rs,mid+1,r,x,y);
		return res;
	}
};
```

## 例题

### 洛谷 P3372 【模板】线段树 1

<Problem id="P3372" />

### 洛谷 P13825 【模板】线段树 1.5

<Problem id="P13825" />

### 洛谷 P3373 【模板】线段树 2

<Problem id="P3373" />

### 洛谷 P4588 [TJOI2018] 数学计算

<Problem id="P4588" />

### 洛谷 P1471 方差

<Problem id="P1471" />

### 洛谷 P4556 [Vani有约会] 雨天的尾巴 /【模板】线段树合并

<Problem id="P4556" />

### 洛谷 CF786B Legacy

<Problem id="CF786B" />
