#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=2;
ll a1,a2,mod;
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
		res.a[0][0]=a2;res.a[0][1]=a1;
		res.a[1][0]=0;res.a[1][1]=0;
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
	ll p,q,n;
	cin>>p>>q>>a1>>a2>>n>>mod;
	if(n==1){cout<<a1<<'\n';return 0;}
	if(n==2){cout<<a2<<'\n';return 0;}
	Mat mat;
	mat.a[0][0]=p;mat.a[0][1]=1;
	mat.a[1][0]=q;mat.a[1][1]=0;
	mat=mat^n-2;
	cout<<mat.a[0][0]%mod<<'\n';
	return 0;
}
