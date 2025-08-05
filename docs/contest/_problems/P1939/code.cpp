#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int mod=1e9+7;
const int N=3;
struct Mat
{
	ll a[N][N];
	Mat operator*(const Mat &rhs) const
	{
		Mat res;
		for(int i=0;i<N;i++)
		{
			for(int j=0;j<N;j++)
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
	int T;
	cin>>T;
	while(T--)
	{
		ll n;
		cin>>n;
		Mat mat={{{1,0,1},{1,0,0},{0,1,0}}};
		mat=mat^(n-1);
		cout<<mat.a[0][0]<<'\n';
	}
	return 0;
}