export type SocialLink = {
  icon: string;
  href: string;
  label: string;
  type: 'phone' | 'email' | 'social' | 'qr';
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    icon: "ri:phone-line",
    href: "tel:+86 17757102577",
    label: "电话",
    type: "phone"
  },
  {
    icon: "ri:mail-line",
    href: "mailto:lailai0x394@gmail.com", 
    label: "邮箱",
    type: "email"
  },
  {
    icon: "ri:qq-line",
    href: "https://www.lailai.one/img/community/qq.jpg",
    label: "QQ",
    type: "qr"
  },
  {
    icon: "ri:wechat-line",
    href: "https://www.lailai.one/img/community/wechat.jpg",
    label: "微信", 
    type: "qr"
  },
  {
    icon: "ri:twitter-x-line",
    href: "https://x.com/lailai0x394",
    label: "X",
    type: "social"
  },
  {
    icon: "ri:telegram-line",
    href: "https://t.me/lailai0916",
    label: "Telegram",
    type: "social"
  },
  {
    icon: "ri:linkedin-line",
    href: "https://www.linkedin.com/in/lailai0916",
    label: "LinkedIn",
    type: "social"
  },
  {
    icon: "ri:github-line",
    href: "https://github.com/lailai0916",
    label: "GitHub",
    type: "social"
  }
];

// 便捷的分组导出
export const CONTACT_LINKS = SOCIAL_LINKS.filter(link => link.type === 'phone' || link.type === 'email');
export const QR_LINKS = SOCIAL_LINKS.filter(link => link.type === 'qr');
export const SOCIAL_MEDIA_LINKS = SOCIAL_LINKS.filter(link => link.type === 'social');
