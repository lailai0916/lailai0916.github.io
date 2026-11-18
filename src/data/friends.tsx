import { translate } from '@docusaurus/Translate';

interface FriendItem {
  id: string;
  title: string;
  description?: string;
  href: string;
  avatar?: string;
  rss?: string;
}

export const FRIEND_LIST: FriendItem[] = [
  {
    id: 'sintle',
    title: translate({
      id: 'data.friends.sintle.title',
      message: 'Sintle',
    }),
    description: translate({
      id: 'data.friends.sintle.description',
      message: 'Code, Learn, Share',
    }),
    href: 'https://sintle.github.io',
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=3545418095&s=640',
    rss: 'https://sintle.github.io/blog/rss.xml',
  },
  {
    id: 'yunLuo',
    title: translate({
      id: 'data.friends.yunLuo.title',
      message: 'YunLuo',
    }),
    description: translate({
      id: 'data.friends.yunLuo.description',
      message: '这是个人',
    }),
    href: 'https://www.cnblogs.com/yunluo-qwq',
    avatar: 'https://cdn.luogu.com.cn/upload/usericon/765961.png',
    rss: 'https://feed.cnblogs.com/blog/u/836486/rss/',
  },
  {
    id: 'mirekintoc',
    title: translate({
      id: 'data.friends.mirekintoc.title',
      message: 'Mirekintoc',
    }),
    description: translate({
      id: 'data.friends.mirekintoc.description',
      message: 'Zate feíam sucur ilém',
    }),
    href: 'https://vochant.github.io',
    avatar: 'https://vochant.github.io/images/logo.svg',
  },
  {
    id: 'akorz',
    title: translate({
      id: 'data.friends.akorz.title',
      message: 'AKorz',
    }),
    description: translate({
      id: 'data.friends.akorz.description',
      message: 'FACE THE SIN, SAVE THE E.G.O.',
    }),
    href: 'https://www.luogu.com.cn/user/716602',
    avatar: 'https://cdn.luogu.com.cn/upload/usericon/716602.png',
  },
  {
    id: 'cefqwq',
    title: translate({
      id: 'data.friends.cefqwq.title',
      message: 'CEFqwq',
    }),
    description: translate({
      id: 'data.friends.cefqwq.description',
      message: '代词使用她',
    }),
    href: 'https://www.luogu.com.cn/user/482610',
    avatar: 'https://cdn.luogu.com.cn/upload/usericon/482610.png',
  },
  {
    id: 'ladex',
    title: translate({
      id: 'data.friends.ladex.title',
      message: 'LaDeX',
    }),
    description: translate({
      id: 'data.friends.ladex.description',
      message: 'Ciallo～(∠・ω< )⌒★',
    }),
    href: 'https://www.luogu.com.cn/user/431658',
    avatar: 'https://cdn.luogu.com.cn/upload/usericon/431658.png',
  },
  {
    id: 'dreamMaker',
    title: translate({
      id: 'data.friends.dreamMaker.title',
      message: 'Dream__maker',
    }),
    description: translate({
      id: 'data.friends.dreamMaker.description',
      message: '一息尚存，方能涅槃而生',
    }),
    href: 'https://www.cnblogs.com/jdzhzw',
    avatar: 'https://cdn.luogu.com.cn/upload/usericon/718017.png',
    rss: 'https://feed.cnblogs.com/blog/u/819543/rss/',
  },
  {
    id: 'jasonshan10',
    title: translate({
      id: 'data.friends.jasonshan10.title',
      message: 'Jasonshan10',
    }),
    href: 'https://www.cnblogs.com/Jasonshan10',
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=342200890&s=640',
    rss: 'https://feed.cnblogs.com/blog/u/811362/rss/',
  },
  {
    id: 'sjz2010',
    title: translate({
      id: 'data.friends.sjz2010.title',
      message: 'SJZ2010',
    }),
    description: translate({
      id: 'data.friends.sjz2010.description',
      message: '初心不改，求索依然。',
    }),
    href: 'https://www.cnblogs.com/decimal10',
    avatar: 'https://cdn.luogu.com.cn/upload/usericon/809729.png',
    rss: 'https://feed.cnblogs.com/blog/u/800177/rss/',
  },
  {
    id: 'castamere',
    title: translate({
      id: 'data.friends.castamere.title',
      message: 'Castamere',
    }),
    description: translate({
      id: 'data.friends.castamere.description',
      message: '代码美学',
    }),
    href: 'https://www.castamerego.com',
    avatar: 'https://github.com/Casta-mere.png',
    rss: 'https://www.castamerego.com/blog/rss.xml',
  },
  {
    id: 'cszj',
    title: translate({
      id: 'data.friends.cszj.title',
      message: '吕舒君的博客',
    }),
    description: translate({
      id: 'data.friends.cszj.description',
      message: '分享计算机学习过程中的相关知识、干活，不定期更新，欢迎常来看看哦！',
    }),
    href: 'https://cszj.wang',
    avatar: 'https://cszj.wang/api/f/X3fbn/mmexport1762511348709.png',
    rss: 'https://cszj.wang/rss.xml',
  },
  {
    id: 'kuizuo',
    title: translate({
      id: 'data.friends.kuizuo.title',
      message: '愧怍',
    }),
    description: translate({
      id: 'data.friends.kuizuo.description',
      message: '道阻且长，行则将至',
    }),
    href: 'https://kuizuo.me',
    avatar: 'https://kuizuo.me/img/logo.png',
    rss: 'https://kuizuo.me/blog/rss.xml',
  },
  {
    id: 'skywt',
    title: translate({
      id: 'data.friends.skywt.title',
      message: 'SkyWT',
    }),
    description: translate({
      id: 'data.friends.skywt.description',
      message: 'Passionate software designer & engineer.',
    }),
    href: 'https://skywt.net',
    avatar: 'https://img.skywt.net/avatar.jpg',
    rss: 'https://skywt.net/rss.xml',
  },
  {
    id: 'baoshuo',
    title: translate({
      id: 'data.friends.baoshuo.title',
      message: 'Baoshuo',
    }),
    description: translate({
      id: 'data.friends.baoshuo.description',
      message: 'Even with a heavy past, accept it and continue moving forward.',
    }),
    href: 'https://oi.baoshuo.ren',
    avatar: 'https://cdn.jsdelivr.net/npm/bsi/avatar/512x512.png',
    rss: 'https://oi.baoshuo.ren/atom.xml',
  },
  {
    id: 'cyanHaze',
    title: translate({
      id: 'data.friends.cyanHaze.title',
      message: "CyanHaze's Homepage",
    }),
    description: translate({
      id: 'data.friends.cyanHaze.description',
      message: 'Undergraduate @ ZJU',
    }),
    href: 'https://cyanhaze.github.io',
    avatar: 'https://cyanhaze.github.io/images/avatar.png',
    rss: 'https://cyanhaze.github.io/feed.xml',
  },
  {
    id: 'studyingFather',
    title: translate({
      id: 'data.friends.studyingFather.title',
      message: "Studying Father's blog",
    }),
    description: translate({
      id: 'data.friends.studyingFather.description',
      message: 'Focus on interest!',
    }),
    href: 'https://studyingfather.com',
    avatar: 'https://studyingfather.cdn.zsq001.cn/wp-content/uploads/2024/04/400x400.png',
    rss: 'https://studyingfather.com/feed',
  },
  {
    id: 'federico2903',
    title: translate({
      id: 'data.friends.federico2903.title',
      message: 'Federico2903',
    }),
    description: translate({
      id: 'data.friends.federico2903.description',
      message: 'Pisa tino, magi gali humo lonrodop.',
    }),
    href: 'https://www.federico2903.dev',
    avatar: 'https://mydisk.cn-nb1.rains3.com/头像.png',
  },
  {
    id: 'xiaoten',
    title: translate({
      id: 'data.friends.xiaoten.title',
      message: '小十的个人博客',
    }),
    description: translate({
      id: 'data.friends.xiaoten.description',
      message: '调配电流、像素和代码的ISFP型导体。',
    }),
    href: 'https://www.xiaoten.com/',
    avatar: 'https://www.xiaoten.com/avatar.png',
    rss: 'https://www.xiaoten.com/index.xml',
  },
  {
    id: 'debert',
    title: translate({
      id: 'data.friends.debert.title',
      message: 'Debert',
    }),
    description: translate({
      id: 'data.friends.debert.description',
      message: 'Great oaks from little acorns grow.',
    }),
    href: 'https://debertjamie.com',
    avatar: 'https://debertjamie.com/avatar.png',
    rss: 'https://debertjamie.com/feed.xml',
  },
  {
    id: 'ariasaka',
    title: translate({
      id: 'data.friends.ariasaka.title',
      message: 'Ariasakaの小窝',
    }),
    description: translate({
      id: 'data.friends.ariasaka.description',
      message: '人有悲欢离合 月有阴晴圆缺',
    }),
    href: 'https://blog.yaria.top',
    avatar: 'https://img.0v0.my/2024/12/05/67517bcf104da.png',
    rss: 'https://blog.yaria.top/feed.xml',
  },
  {
    id: 'rabithua',
    title: translate({
      id: 'data.friends.rabithua.title',
      message: 'Rabithua',
    }),
    description: translate({
      id: 'data.friends.rabithua.description',
      message:
        'Front-end development, UI and interaction design, photography, and independent creative experiments.',
    }),
    href: 'https://zzfw.cc',
    avatar: 'https://public.zzfw.cc/rabithua/rabithua.svg',
    rss: 'https://api.rote.ink/v2/api/rss/rabithua',
  },
  {
    id: 'arthals',
    title: translate({
      id: 'data.friends.arthals.title',
      message: "Arthals' ink",
    }),
    description: translate({
      id: 'data.friends.arthals.description',
      message: '所见高山远木，阔云流风；所幸岁月盈余，了无拘束',
    }),
    href: 'https://arthals.ink/',
    avatar: 'https://cdn.arthals.ink/Arthals.png',
    rss: 'https://arthals.ink/rss.xml',
  },
  {
    id: 'ethan',
    title: translate({
      id: 'data.friends.ethan.title',
      message: 'Ethan',
    }),
    description: translate({
      id: 'data.friends.ethan.description',
      message: "Don't stay awake for too long.",
    }),
    href: 'https://hanlife02.com',
    avatar: 'https://hanlife02.com/avatar.webp?v=20260804',
    rss: 'https://hanlife02.com/rss.xml',
  },
  {
    id: 'mofei',
    title: translate({
      id: 'data.friends.mofei.title',
      message: 'Mofei - A Super Dad Programmer in Finland',
    }),
    description: translate({
      id: 'data.friends.mofei.description',
      message:
        'A super dad programmer living in Finland, writing about immigration life, parenting, and occasionally technology.',
    }),
    href: 'https://www.mofei.life',
    avatar: 'https://www.mofei.life/img/mofei-logo_500_500.png',
    rss: 'https://www.mofei.life/zh/rss',
  },
  {
    id: 'yixuanWang',
    title: translate({
      id: 'data.friends.yixuanWang.title',
      message: 'Pak',
    }),
    description: translate({
      id: 'data.friends.yixuanWang.description',
      message: "Yixuan Wang's blog.",
    }),
    href: 'https://blog.yixuan-wang.site',
    avatar: 'https://am.yixuan-wang.site/avatar.webp',
    rss: 'https://blog.yixuan-wang.site/feed.xml',
  },
];
