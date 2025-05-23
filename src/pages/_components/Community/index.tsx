import React from 'react';
import clsx from 'clsx';
// Assuming global styles like 'section' and 'sectionAlt' are available globally
// or imported from a higher-level component or a main CSS file.
// For local component styles:
import localStyles from './styles.module.css'; 
import Link from '@docusaurus/Link';
import { Icon } from '@iconify/react';
import { COMMUNITY_LINKS } from '@site/src/data/community';

export default function Community() {
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
          {COMMUNITY_LINKS.map((link, idx) => (
            // Apply .iconItem to each icon wrapper, remove inline styles
            <div key={idx} className={localStyles.iconItem}>
              <Link
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                title={link.label}
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
