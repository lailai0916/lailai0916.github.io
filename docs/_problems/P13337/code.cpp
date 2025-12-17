#include <bits/stdc++.h>
using namespace std;

using ld=long double;
const int N=110;
const ld eps=1e-12l; 

int n,m;
ld a[N][N];
int id_b[N],id_n[N];

void pivot(int x,int y)
{
	swap(id_n[x],id_b[y]);
	ld v=-1/a[x][y];
	for(int j=0;j<=m+1;j++)a[x][j]=(j==y?-v:v*a[x][j]);
	for(int i=0;i<=n;i++)
	{
		if(i==x)continue;
		v=a[i][y];
		a[i][y]=0;
		for(int j=0;j<=m+1;j++)a[i][j]+=v*a[x][j];
	}
}

int init()
{
	int cnt=0;
	for(int j=0;j<m;j++)if(a[n][j]<-eps)
	{
		for(int i=0;i<=n;i++)a[i][m+1]+=a[i][j];
		id_b[j]=~id_b[j];
		cnt++;
	}
	while(cnt)
	{
		int x=-1;
		ld mn=-eps;
		for(int i=0;i<n;i++)if(a[i][m+1]<mn)mn=a[i][m+1],x=i;
		if(x==-1)return -1;
		int y=-1;
		mn=INFINITY;
		for(int j=0;j<m;j++)
		{
			if((id_b[j]<0&&a[x][j]<-eps)||(id_b[j]>=0&&a[x][j]>eps))
			{
				ld t=a[n][j]/a[x][j]+(id_b[j]<0?-eps:eps);
				if(t<mn)mn=t,y=j;
			}
		}
		if(id_b[y]<0)cnt--,id_b[y]=~id_b[y],pivot(x,y),a[x][m+1]++;
		else pivot(x,y);
	}
	return 0;
}

int simplex()
{
	while(1)
	{
		int x=-1;
		ld mn=-eps;
		for(int i=0;i<n;i++)if(a[i][m]<mn)mn=a[i][m],x=i;
		if(x==-1)break;
		int y=-1;
		mn=INFINITY;
		for(int j=0;j<m;j++)if(a[x][j]>eps)
		{
			ld t=a[n][j]/a[x][j];
			if(t<mn)mn=t,y=j;
		}
		if(y==-1)return 1;
		pivot(x,y);
	}
	return 0;
}

int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	cout<<fixed<<setprecision(8);
	cin>>n>>m;
	for(int i=0;i<n;i++)cin>>a[i][m],a[i][m]=-a[i][m];
	for(int j=0;j<m;j++)
	{
		for(int i=0;i<=n;i++)cin>>a[i][j];
	}
	iota(id_b,id_b+m,n);
	iota(id_n,id_n+n,0);
	int res=init();
	if(res==0)res=simplex();
	
	if(res==-1)cout<<"Infeasible"<<'\n';
	else if(res==1)cout<<"Unbounded"<<'\n';
	else
	{
		cout<<a[n][m]<<'\n';
		static ld ans[N];
		for(int j=0;j<m;j++)if(id_b[j]<n)ans[id_b[j]]=a[n][j];
		for(int i=0;i<n;i++)cout<<ans[i]<<(i==n-1?'\n':' ');
	}
	return 0;
}
