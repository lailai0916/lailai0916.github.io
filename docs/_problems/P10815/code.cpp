#include <bits/stdc++.h>
using namespace std;

using ll=long long;
ll read()
{
	ll x=0,f=1;char c=getchar_unlocked();
	while(c<'0'||c>'9'){if(c=='-')f=-1;c=getchar_unlocked();}
	while(c>='0'&&c<='9')x=x*10+c-48,c=getchar_unlocked();
	return x*f;
}
void write(ll x)
{
	if(x<0)putchar('-'),x=-x;
	if(x>9)write(x/10);
	putchar(x%10+48);
}
int main()
{
    int n=read();
    ll ans=0;
    for(int i=1;i<=n;i++)
	{
		ll x=read();
		ans+=x;
	}
    write(ans);
    return 0;
}
