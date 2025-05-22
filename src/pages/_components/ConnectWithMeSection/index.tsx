import React from 'react';
import clsx from 'clsx';
// Assuming global styles like 'section' and 'sectionAlt' are available globally
// or imported from a higher-level component or a main CSS file.
// For local component styles:
import localStyles from './styles.module.css'; 
import Link from '@docusaurus/Link';
import { Icon } from '@iconify/react';

const contactLinks = [
  { name: '+86 17757102577', url: 'tel:+86 17757102577', icon: 'ri:phone-line' },
  { name: 'lailai0x394@gmail.com', url: 'mailto:lailai0x394@gmail.com', icon: 'ri:mail-line' },
  { name: '11548585', url: 'https://www.lailai.one/img/community/qq.jpg', icon: 'ri:qq-line' },
  { name: 'lailai0x394', url: 'https://www.lailai.one/img/community/wechat.jpg', icon: 'ri:wechat-line' },
  { name: 'lailai0x394', url: 'https://x.com/lailai0x394', icon: 'ri:twitter-x-line' },
  { name: 'lailai0916', url: 'https://t.me/lailai0916', icon: 'ri:telegram-line' },
  { name: 'lailai0916', url: 'https://www.linkedin.com/in/lailai0916', icon: 'ri:linkedin-line' },
  { name: 'lailai0916', url: 'https://github.com/lailai0916', icon: 'ri:github-line' },
];

export default function ConnectWithMeSection() {
  return (
    // Use global class names directly if they are indeed global
    <div className={clsx('section', 'sectionAlt')}> 
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>我的社区</h2>
          </div>
        </div>
        {/* Apply the new CSS Grid container class and remove inline styles */}
        <div className={clsx('row', localStyles.communityIconsContainer)}>
          {contactLinks.map((link, idx) => (
            // Apply .iconItem to each icon wrapper, remove inline styles
            <div key={idx} className={localStyles.iconItem}>
              <Link
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                title={link.name}
                // Inline styles for display, alignment, and padding are now handled by .iconItem and .communityIconsContainer
              >
                <Icon icon={link.icon} width="32" height="32" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
