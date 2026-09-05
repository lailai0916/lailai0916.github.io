#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=2000005;
int ch[N][26],link_[N],len[N],tot=1;
int insert(int last,int c)
{
	if(ch[last][c])
	{
		int q=ch[last][c];
		if(len[q]==len[last]+1)return q;
		int nq=++tot;
		len[nq]=len[last]+1;
		link_[nq]=link_[q];
		memcpy(ch[nq],ch[q],sizeof(ch[q]));
		while(last&&ch[last][c]==q)
		{
			ch[last][c]=nq;
			last=link_[last];
		}
		link_[q]=nq;
		return nq;
	}
	int cur=++tot;
	len[cur]=len[last]+1;
	int p=last;
	while(p&&!ch[p][c])
	{
		ch[p][c]=cur;
		p=link_[p];
	}
	if(!p)link_[cur]=1;
	else
	{
		int q=ch[p][c];
		if(len[q]==len[p]+1)link_[cur]=q;
		else
		{
			int nq=++tot;
			len[nq]=len[p]+1;
			link_[nq]=link_[q];
			memcpy(ch[nq],ch[q],sizeof(ch[q]));
			while(p&&ch[p][c]==q)
			{
				ch[p][c]=nq;
				p=link_[p];
			}
			link_[q]=link_[cur]=nq;
		}
	}
	return cur;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	for(int i=1;i<=n;i++)
	{
		string s;
		cin>>s;
		int last=1;
		for(char c:s)last=insert(last,c-'a');
	}
	ll ans=0;
	for(int i=2;i<=tot;i++)ans+=len[i]-len[link_[i]];
	cout<<ans<<'\n'<<tot<<'\n';
	return 0;
}
