#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int mod=1000000007;
const int N=105;
int n;
struct Mat
{
	ll a[N][N];
	Mat operator*(const Mat &rhs) const
	{
		Mat res;
		for(int i=0;i<n;i++)
		{
			for(int j=0;j<n;j++)
			{
				res.a[i][j]=0;
				for(int k=0;k<N;k++)
				{
					res.a[i][j]=(res.a[i][j]+a[i][k]*rhs.a[k][j])%mod;
				}
			}
		}
		return res;
	}
	Mat operator^(ll rhs)
	{
		Mat res,tmp=*this;
		for(int i=0;i<N;i++)
		{
			for(int j=0;j<N;j++)
			{
				res.a[i][j]=(i==j);
			}
		}
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
	cin>>n>>k;
	Mat mat;
	for(int i=0;i<n;i++)
	{
		for(int j=0;j<n;j++)
		{
			cin>>mat.a[i][j];
		}
	}
	mat=mat^k;
	for(int i=0;i<n;i++)
	{
		for(int j=0;j<n;j++)
		{
			cout<<mat.a[i][j]<<' ';
		}
		cout<<'\n';
	}
	return 0;
}