#include <bits/stdc++.h>
using namespace std;

const int N=500005;
int ch[N][26],fail[N],len[N],cnt[N],tot,last;
char s[N];
int n;
int get_fail(int u)
{
	while(s[n-len[u]-1]!=s[n])u=fail[u];
	return u;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	scanf("%s",s+1);
	fail[0]=1;
	len[1]=-1;
	tot=1;
	s[0]='#';
	int m=strlen(s+1),k=0;
	for(n=1;n<=m;n++)
	{
		s[n]=(s[n]-97+k)%26+97;
		int p=get_fail(last);
		int c=s[n]-'a';
		if(!ch[p][c])
		{
			int cur=++tot;
			len[cur]=len[p]+2;
			fail[cur]=ch[get_fail(fail[p])][c];
			cnt[cur]=cnt[fail[cur]]+1;
			ch[p][c]=cur;
		}
		last=ch[p][c];
		k=cnt[last];
		printf("%d ",k);
	}
	return 0;
}
