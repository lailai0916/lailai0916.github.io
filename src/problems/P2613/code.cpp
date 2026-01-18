#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int mod=19260817;
ll read()
{
	ll x=0,f=1;char c=getchar();
	while(c<'0'||c>'9'){if(c=='-')f=-1;c=getchar();}
	while(c>='0'&&c<='9'){x=(x*10+c-48)%mod;c=getchar();}
	return x*f;
}
ll Pow(ll x,ll y)
{
	x%=mod;
	ll res=1;
	while(y)
	{
		if(y&1)res=res*x%mod;
		x=x*x%mod;
		y>>=1;
	}
	return res;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	ll a=read(),b=read();
	if(b==0)cout<<"Angry!"<<'\n';
	else cout<<a*Pow(b,mod-2)%mod<<'\n';
	return 0;
}
