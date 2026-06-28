#include <bits/stdc++.h>
using namespace std;

const int N=5000005;
char s[N];
int main()
{
	int n=0;
	int c;
	while((c=getchar())>='a'&&c<='z')s[++n]=c;
	int ans=0;
	int i=1;
	while(i<=n)
	{
		int j=i,k=i+1;
		while(k<=n&&s[j]<=s[k])
		{
			if(s[j]<s[k])j=i;
			else j++;
			k++;
		}
		while(i<=j)
		{
			ans^=i+k-j-1;
			i+=k-j;
		}
	}
	printf("%d\n",ans);
	return 0;
}
