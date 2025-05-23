import React from 'react';
import Link from '@docusaurus/Link';
import { Icon } from '@iconify/react';
import { SOCIAL_LINKS } from '@site/src/data/social.tsx';

interface SocialLinksProps {
  iconSize?: number;
  className?: string;
  showLabels?: boolean;
}

export default function SocialLinks({ 
  iconSize = 20, 
  className = '',
  showLabels = true 
}: SocialLinksProps) {
  return (
    <div className={className}>
      {SOCIAL_LINKS.map((link, index) => (
        <div key={index}>
          <Icon icon={link.icon} width={iconSize} height={iconSize} />
          <Link to={link.href}>
            {showLabels ? getDisplayText(link) : link.label}
          </Link>
        </div>
      ))}
    </div>
  );
}

// 获取显示文本的辅助函数
function getDisplayText(link) {
  switch (link.type) {
    case 'phone':
      return '+86 17757102577';
    case 'email':
      return 'lailai0x394@gmail.com';
    case 'qr':
      return link.label === 'QQ' ? '11548585' : 'lailai0x394';
    case 'social':
      return 'lailai0x394';
    default:
      return link.label;
  }
}
