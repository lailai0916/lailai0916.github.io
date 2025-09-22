#include <bits/stdc++.h>
using namespace std;

const int N=105;
struct Node
{
	int a,b;
	double f;
	bool operator<(const Node &rhs){return f>rhs.f;}
}a[N];
int n,m,ans=0;
int f(int t,int v)
{
	int res=0;
	for(int i=1;t+i<=n;i++)
	{
		if(v<a[t+i].a)return res+v*a[t+i].f;
		v-=a[t+i].a;
		res+=a[t+i].b;
	}
	return res;
}
void work(int t,int p,int v)
{
	ans=max(ans,v);
	if(t>n)return;
	if(f(t,p)+v>ans)work(t+1,p,v);
	if(a[t].a<=p)work(t+1,p-a[t].a,v+a[t].b);
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	cin>>m>>n;
	for(int i=1;i<=n;i++)
	{
		cin>>a[i].a>>a[i].b;
		a[i].f=a[i].b*1.0/a[i].a;
	}
	sort(a+1,a+n+1);
	work(1,m,0);
	cout<<ans<<'\n';
	return 0;
}
