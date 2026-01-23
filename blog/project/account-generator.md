---
title: '账号生成器'
date: 2025-10-21T20:21
tags: [project]
---

程序随机生成不超过 $16$ 位的用户名，并根据该用户名生成密码。

<!-- truncate -->

## 代码

```cpp title="main.cpp"
#include <bits/stdc++.h>
using namespace std;

const vector<string> first=
{
	"alex","adam","amy","arthur","andrew","anna","ashley","austin","bella","ben",
	"brad","brandon","brian","brittany","brooke","cameron","carol","charles","chloe","chris",
	"claire","cole","connor","cynthia","daniel","david","derek","diana","dylan","edward",
	"ella","emily","ethan","eva","evan","faith","felix","frank","gabriel","george",
	"grace","grant","greg","hannah","harry","henry","holly","ian","isaac","isabel",
	"jack","jacob","james","jason","jeff","jennifer","jessica","john","jordan","joseph",
	"josh","julia","justin","karen","karl","kate","kevin","kim","laura","leo",
	"liam","lily","lucas","lucy","madison","mark","mary","matt","mia","michael",
	"michelle","mike","morgan","natalie","nathan","nick","noah","olivia","oscar","paul",
	"peter","rachel","rebecca","richard","robert","ryan","sam","sara","sophia","thomas",
	"tim","tyler","victor","william","zoe"
};
const vector<string> last=
{
	"adams","allen","anderson","bailey","baker","barnes","bennett","brooks","brown","butler",
	"campbell","carter","clark","collins","cook","cooper","cox","cruz","davies","davis",
	"diaz","edwards","evans","fisher","flores","foster","garcia","gomez","gonzalez","gray",
	"green","griffin","hall","harris","hayes","henderson","hill","hughes","jackson","jenkins",
	"johnson","jones","kelly","kennedy","kim","king","lee","lewis","lopez","martin",
	"martinez","miller","mitchell","moore","morgan","morris","murphy","nelson","nguyen","parker",
	"perez","perry","peterson","phillips","powell","price","ramirez","reed","richardson","rivera",
	"roberts","robinson","rodriguez","rogers","ross","russell","sanchez","sanderson","scott","simmons",
	"smith","stewart","taylor","thomas","thompson","torres","turner","walker","ward","washington",
	"watson","white","williams","wilson","wood","wright","young","zimmerman"
};
string gen_pass(const string &name)
{
	static const string s="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	size_t h=hash<string>{}(name);
	mt19937 rng((unsigned)h);
	string res;
	for(int i=0;i<12;i++)res+=s[rng()%s.size()];
	return res;
}
string cap(const string &s)
{
	string t=s;
	if(!t.empty())t[0]=toupper(t[0]);
	return t;
}
string gen_user()
{
	static mt19937 rng((unsigned)chrono::steady_clock::now().time_since_epoch().count());
	uniform_int_distribution<int> f(0,(int)first.size()-1),l(0,(int)last.size()-1),n(0,9999);
	string fname=cap(first[f(rng)]);
	string lname=cap(last[l(rng)]);
	stringstream ss;
	ss<<setw(4)<<setfill('0')<<n(rng);
	string user=fname+lname+ss.str();
	if(user.size()>16)user=user.substr(0,16);
	return user;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	string user=gen_user();
	cout<<user<<'\n';
	cout<<gen_pass(user)<<'\n';
	return 0;
}
```
