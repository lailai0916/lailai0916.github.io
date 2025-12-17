#include <bits/stdc++.h>
using namespace std;

using ld=long double;
const int N=110;
const ld eps=1e-9;

int n,m,neg;
int p[N],q[N];
ld a[N][N];

int sgn(ld x)
{
	if(x>=-eps&&x<=eps)return 0;
	return x<0?-1:1;
}

ld val(int x,int y)
{
	if(sgn(a[x][y])>=0)return 0;
	ld s=0;
	for(int i=0;i<m;i++)s+=a[x][i]*a[x][i];
	return a[x][y]*a[x][y]/s;
}

void pivot(int x,int y)
{
	swap(p[x],q[y]);
	ld v=-1/a[x][y];
	for(int j=0;j<=m+1;j++)a[x][j]=(j==y?-v:v*a[x][j]);
	for(int i=0;i<=n;i++)
	{
		if(i!=x)
		{
			v=a[i][y];
			a[i][y]=0;
			for(int j=0;j<=m+1;j++)a[i][j]+=v*a[x][j];
		}
	}
}

int init()
{
	while(neg)
	{
		int x=-1;
		ld mx=0;
		for(int i=0;i<n;i++)
		{
			ld s=val(i,m+1);
			if(s>mx)mx=s,x=i;
		}
		if(x<0)return 0;
		int y=-1,sy=-1;
		for(int j=0;j<m;j++)
		{
			int sj=sgn(a[x][j]);
			if(sj==(q[j]<0?-1:1))
			{
				if(y<0)y=j,sy=sj;
				else
				{
					int s=sj*sy*sgn(a[n][j]*a[x][y]-a[n][y]*a[x][j]);
					if(!s)s=(q[j]<q[y]?-1:1);
					if(s<0)y=j,sy=sj;
				}
			}
		}
		if(q[y]<0)
		{
			neg--;
			q[y]=~q[y];
			pivot(x,y);
			a[x][m+1]+=1;
		}
		else pivot(x,y);
	}
	return 1;
}

int simplex()
{
	while(1)
	{
		int x=-1;
		ld mx=0;
		for(int i=0;i<n;i++)
		{
			ld s=val(i,m);
			if(s>mx)mx=s,x=i;
		}
		if(x<0)return 1;
		int y=-1;
		for(int j=0;j<m;j++)if(sgn(a[x][j])>0)
		{
			if(y<0)y=j;
			else
			{
				int s=sgn(a[n][j]*a[x][y]-a[n][y]*a[x][j]);
				if(!s)s=(q[j]<q[y]?-1:1);
				if(s<0)y=j;
			}
		}
		if(y<0)return 0;
		pivot(x,y);
	}
}

int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	cout<<fixed<<setprecision(10);
	cin>>n>>m;
	for(int i=0;i<n;i++)
	{
		ld t;
		cin>>t;
		a[i][m]=-t;
	}
	for(int j=0;j<m;j++)
	{
		for(int i=0;i<n;i++)cin>>a[i][j];
		cin>>a[n][j];
	}
	for(int i=0;i<n;i++)p[i]=i;
	for(int j=0;j<m;j++)q[j]=n+j;
	for(int j=0;j<m;j++)if(sgn(a[n][j])<0)
	{
		for(int i=0;i<n;i++)a[i][m+1]+=a[i][j];
		q[j]=~q[j];
		neg++;
	}
	if(!init())cout<<"Infeasible"<<'\n';
	else if(!simplex())cout<<"Unbounded"<<'\n';
	else
	{
		cout<<a[n][m]<<'\n';
		static ld ans[N];
		for(int i=0;i<m;i++)if(q[i]<n)ans[q[i]]=a[n][i];
		for(int i=0;i<n;i++)cout<<ans[i]<<(i==n-1?'\n':' ');
	}
	return 0;
}
