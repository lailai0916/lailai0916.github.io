import React from 'react';
import clsx from 'clsx'; // 导入 clsx
import styles from '../../styles.module.css';
import Link from '@docusaurus/Link';
import { Icon } from '@iconify/react'; // 导入 Icon 组件

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
    <div className={clsx(styles.section, styles.sectionAlt)}> {/* 使用 clsx 应用多个类并移除内联样式 */}
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>我的社区</h2>
          </div>
        </div>
        <div className="row" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexWrap: 'wrap' }}>
          {contactLinks.map((link, idx) => (
            <div key={idx} style={{ textAlign: 'center', margin: '0.75rem' }}> {/* Increased margin for better spacing */}
              <Link 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                title={link.name} // Add title for accessibility on hover
                style={{ 
                  display: 'inline-flex', // Changed to inline-flex for better alignment
                  alignItems: 'center', 
                  justifyContent: 'center', // Center icon within the link
                  padding: '0.5rem' // Adjust padding as needed
                }}
              >
                <Icon icon={link.icon} width="28" height="28" /> {/* Increased icon size */}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
