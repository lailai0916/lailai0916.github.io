#include <bits/stdc++.h>
using namespace std;

const int N=1000005;
int sa[N],rk[N<<1],tmp[N],cnt[N];
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	string s;
	cin>>s;
	int n=s.size();
	int m=128;
	for(int i=1;i<=n;i++)rk[i]=s[i-1];
	for(int i=0;i<=m;i++)cnt[i]=0;
	for(int i=1;i<=n;i++)cnt[rk[i]]++;
	for(int i=1;i<=m;i++)cnt[i]+=cnt[i-1];
	for(int i=n;i>=1;i--)sa[cnt[rk[i]]--]=i;
	for(int w=1;w<n;w<<=1)
	{
		int p=0;
		for(int i=n-w+1;i<=n;i++)tmp[++p]=i;
		for(int i=1;i<=n;i++)if(sa[i]>w)tmp[++p]=sa[i]-w;
		for(int i=0;i<=m;i++)cnt[i]=0;
		for(int i=1;i<=n;i++)cnt[rk[i]]++;
		for(int i=1;i<=m;i++)cnt[i]+=cnt[i-1];
		for(int i=n;i>=1;i--)sa[cnt[rk[tmp[i]]]--]=tmp[i];
		for(int i=1;i<=n;i++)tmp[i]=rk[i];
		p=0;
		for(int i=1;i<=n;i++)
		{
			int x=sa[i],y=sa[i-1];
			if(tmp[x]==tmp[y]&&tmp[x+w]==tmp[y+w])rk[x]=p;
			else rk[x]=++p;
		}
		if(p==n)break;
		m=p;
	}
	for(int i=1;i<=n;i++)cout<<sa[i]<<' ';
	return 0;
}
