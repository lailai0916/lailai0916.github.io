#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int mod=100000000;
const int N=2;
struct Mat
{
	ll a[N][N];
	Mat(){memset(a,0,sizeof a);}
	Mat operator*(const Mat &rhs) const
	{
		Mat res;
		for(int i=0;i<N;i++)
		{
			for(int j=0;j<N;j++)
			{
				for(int k=0;k<N;k++)
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
		for(int i=0;i<N;i++)res.a[i][i]=1;
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
	ll n,m;
	cin>>n>>m;
	Mat mat;
	mat.a[0][0]=1;mat.a[0][1]=1;
	mat.a[1][0]=1;mat.a[1][1]=0;
	mat=mat^__gcd(n,m)-1;
	cout<<mat.a[0][0]<<'\n';
	return 0;
}
