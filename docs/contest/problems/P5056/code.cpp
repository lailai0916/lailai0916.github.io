#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int M=13,off=3,mask=(1<<off)-1;
const int SZ=300005,P=299987;
int n,m,ex,ey;
char g[M][M];
int b[M+1],bb[M+1];
ll encode()
{
	ll s=0;
	int bn=1;
	memset(bb,-1,sizeof(bb));
	bb[0]=0;
	for(int i=m;i>=0;i--)
	{
		if(bb[b[i]]<0)bb[b[i]]=bn++;
		s=s<<off|bb[b[i]];
	}
	return s;
}
void decode(ll s)
{
	for(int i=0;i<=m;i++)
	{
		b[i]=s&mask;
		s>>=off;
	}
}
struct Hash
{
	int head[P],nxt[SZ],sz;
	ll st[SZ];
	ll key[SZ];
	void init()
	{
		sz=0;
		memset(head,-1,sizeof(head));
	}
	void push(ll s,ll d)
	{
		int h=s%P;
		for(int i=head[h];~i;i=nxt[i])
		{
			if(st[i]==s)
			{
				key[i]+=d;
				return;
			}
		}
		st[sz]=s;
		key[sz]=d;
		nxt[sz]=head[h];
		head[h]=sz++;
	}
	void roll(){for(int i=0;i<sz;i++)st[i]<<=off;}
}h[2];
int cur;
void push(int j,int dn,int rt,ll d)
{
	b[j]=dn;
	b[j+1]=rt;
	h[cur^1].push(encode(),d);
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	cin>>n>>m;
	for(int i=0;i<n;i++)
	{
		cin>>g[i];
		for(int j=0;j<m;j++)if(g[i][j]=='.')
		{
			ex=i;
			ey=j;
		}
	}
	cur=0;
	h[cur].init();
	h[cur].push(0,1);
	for(int i=0;i<n;i++)
	{
		for(int j=0;j<m;j++)
		{
			int nxt=cur^1;
			h[nxt].init();
			for(int t=0;t<h[cur].sz;t++)
			{
				decode(h[cur].st[t]);
				ll d=h[cur].key[t];
				int lt=b[j],up=b[j+1];
				bool dn=i!=n-1&&g[i+1][j]=='.',rt=j!=m-1&&g[i][j+1]=='.';
				if(g[i][j]=='*')
				{
					if(!lt&&!up)push(j,0,0,d);
				}
				else if(lt&&up)
				{
					if(lt==up)
					{
						if(i==ex&&j==ey)h[nxt].push(0,d);
					}
					else
					{
						for(int o=0;o<=m;o++)if(b[o]==lt)b[o]=up;
						push(j,0,0,d);
					}
				}
				else if(lt||up)
				{
					int t2=lt|up;
					if(dn)push(j,t2,0,d);
					if(rt)push(j,0,t2,d);
				}
				else if(dn&&rt)push(j,m,m,d);
			}
			cur=nxt;
		}
		h[cur].roll();
	}
	ll ans=0;
	for(int t=0;t<h[cur].sz;t++)if(h[cur].st[t]==0)ans+=h[cur].key[t];
	cout<<ans<<'\n';
	return 0;
}
