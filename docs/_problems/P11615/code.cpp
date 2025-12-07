#include <bits/stdc++.h>
using namespace std;

using ull=unsigned long long;
const int N=1<<23;
const int mask=N-1;
struct Hash
{
	ull k[N],v[N],zv;
	int hash(ull x)
	{
		x+=0x9e3779b97f4a7c15;
		x=(x^(x>>30))*0xbf58476d1ce4e5b9;
		x=(x^(x>>27))*0x94d049bb133111eb;
		return (x^(x>>31))&mask;
	}
	ull& operator[](ull x)
	{
		if(!x)return zv;
		int u=hash(x);
		while(k[u]&&k[u]!=x)u=(u+1)&mask;
		if(!k[u])k[u]=x;
		return v[u];
	}
}h;
ull read()
{
	ull x=0,f=1;char c=getchar();
	while(c<'0'||c>'9'){if(c=='-')f=-1;c=getchar();}
	while(c>='0'&&c<='9')x=x*10+c-48,c=getchar();
	return x*f;
}
int main()
{
	int n=read();
	ull ans=0;
	for(int i=1;i<=n;i++)
	{
		ull x=read(),y=read();
		ull &val=h[x];
		ans+=val*i;
		val=y;
	}
	cout<<ans<<'\n';
	return 0;
}
