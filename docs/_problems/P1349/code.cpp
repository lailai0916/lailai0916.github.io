#include <bits/stdc++.h>
using namespace std;

const int N=2;
long long p,q,a1,a2,n,m;
struct Mat
{
	long long a[5][5];
	Mat operator*(const Mat &x) const
	{
		Mat res;
		for(int i=1;i<=N;i++)
		{
			for(int j=1;j<=N;j++)
			{
				res.a[i][j]=0;
				for(int k=1;k<=N;k++)
				{
					res.a[i][j]=(res.a[i][j]+a[i][k]*x.a[k][j])%m;
				}
			}
		}
		return res;
	}
};
Mat Pow(Mat x,long long k)
{
	Mat res;
	res.a[1][1]=a2;res.a[1][2]=a1;
	res.a[2][1]=0;res.a[2][2]=0;
	while(k)
	{
		if(k&1)res=res*x;
		x=x*x;
		k>>=1;
	}
	return res;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	cin>>p>>q>>a1>>a2>>n>>m;
	if(n==1){cout<<a1<<'\n';return 0;}
	if(n==2){cout<<a2<<'\n';return 0;}
	Mat ans;
	ans.a[1][1]=p;ans.a[1][2]=1;
	ans.a[2][1]=q;ans.a[2][2]=0;
	ans=Pow(ans,n-2);
	cout<<ans.a[1][1]%m<<'\n';
	return 0;
}
