#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int inf=0x3f3f3f3f;
const int mod=100000000;
const int N=2;
struct Mat
{
	ll a[N][N];
	Mat operator*(const Mat &b) const
	{
		Mat res;
		for(int i=0;i<N;i++)
		{
			for(int j=0;j<N;j++)
			{
				res.a[i][j]=0;
				for(int k=0;k<N;k++)
				{
					res.a[i][j]=(res.a[i][j]+a[i][k]*b.a[k][j])%mod;
				}
			}
		}
		return res;
	}
	Mat operator^(ll b)
	{
		Mat res,tmp=*this;
		for(int i=0;i<N;i++)
		{
			for(int j=0;j<N;j++)
			{
				res.a[i][j]=(i==j);
			}
		}
		while(b)
		{
			if(b&1)res=res*tmp;
			tmp=tmp*tmp;
			b>>=1;
		}
		return res;
	}
	void operator^=(ll b)
	{
		*this=*this^b;
	}
};
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	ll n,m;
	cin>>n>>m;
	Mat ans={{{1,1},{1,0}}};
	ans^=__gcd(n,m)-1;
	cout<<ans.a[0][0]<<'\n';
	return 0;
}
