#include <bits/stdc++.h>
using namespace std;

using ll=long long;
int main()
{
	int n,m;
    cin>>n>>m;
	ll a=0,b=0;
    for(int i=0;i<n;i++)
    {
        for(int j=0;j<m;j++)
		{
            if(i==j)a+=(n-i)*(m-j);
            else b+=(n-i)*(m-j);
        }
	}
    cout<<a<<' '<<b<<'\n';
    return 0;
}
