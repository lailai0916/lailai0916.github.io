#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int mod=1000000007;
const int N=105;
struct Mat
{
	int n;
	ll a[N][N];
	Mat(){memset(a,0,sizeof a);n=0;}
	Mat operator*(const Mat &rhs) const
	{
		Mat res;
		res.n=n;
		for(int i=0;i<n;i++)
		{
			for(int j=0;j<n;j++)
			{
				for(int k=0;k<n;k++)
				{
					res.a[i][j]=(res.a[i][j]+a[i][k]*rhs.a[k][j])%mod;
				}
			}
		}
		return res;
	}
	Mat operator^(ll rhs) const
	{
		Mat res,tmp=*this;
		res.n=n;
		for(int i=0;i<n;i++)res.a[i][i]=1;
		while(rhs)
		{
			if(rhs&1)res=res*tmp;
			tmp=tmp*tmp;
			rhs>>=1;
		}
		return res;
	}
};
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	ll k;
	Mat mat;
	cin>>mat.n>>k;
	for(int i=0;i<mat.n;i++)
	{
		for(int j=0;j<mat.n;j++)
		{
			cin>>mat.a[i][j];
		}
	}
	mat=mat^k;
	for(int i=0;i<mat.n;i++)
	{
		for(int j=0;j<mat.n;j++)
		{
			cout<<mat.a[i][j]<<' ';
		}
		cout<<'\n';
	}
	return 0;
}
