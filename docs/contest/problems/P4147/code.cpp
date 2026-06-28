#include <bits/stdc++.h>
using namespace std;

const int N=1005;
int h[N],l[N],r[N],stk[N];

int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m;
	cin>>n>>m;
	int ans=0;
	for(int i=1;i<=n;i++)
	{
		for(int j=1;j<=m;j++)
		{
			char c;
			cin>>c;
			if(c=='F')h[j]++;
			else h[j]=0;
		}
		int top=0;
		for(int j=1;j<=m;j++)
		{
			while(top&&h[stk[top]]>=h[j])top--;
			l[j]=top?stk[top]:0;
			stk[++top]=j;
		}
		top=0;
		for(int j=m;j>=1;j--)
		{
			while(top&&h[stk[top]]>=h[j])top--;
			r[j]=top?stk[top]:m+1;
			stk[++top]=j;
		}
		for(int j=1;j<=m;j++)ans=max(ans,h[j]*(r[j]-l[j]-1));
	}
	cout<<ans*3<<'\n';
	return 0;
}
