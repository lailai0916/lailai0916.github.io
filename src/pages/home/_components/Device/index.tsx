import React from 'react';
import { DEVICE_LIST } from '@site/src/data/device';
import {
  BaseCard,
  Section,
  SectionHeader,
  GridLayout,
  GridConfigs,
  IconWrapper,
  TEXT_COLORS,
} from '../common';
import { translate } from '@docusaurus/Translate';

function DeviceCard({ title, icon }: { title: string; icon: string }) {
  return (
    <BaseCard isClickable={false} className="p-5 items-center justify-center">
      <div className="flex flex-col items-center space-y-3">
        <IconWrapper>
          <img
            src={icon}
            alt={title}
            draggable="false"
            className="w-10 h-10 object-contain filter brightness-0 dark:invert transition-transform duration-200 select-none"
          />
        </IconWrapper>
        <h3
          className={`font-medium text-base ${TEXT_COLORS.PRIMARY} text-center leading-snug`}
        >
          {title}
        </h3>
      </div>
    </BaseCard>
  );
}

export default function Device() {
  return (
    <Section>
      <div className="max-w-7xl mx-auto flex flex-col px-5">
        <SectionHeader
          title={translate({
            id: 'home.device.title',
            message: 'My Devices',
          })}
          description={translate({
            id: 'home.device.description',
            message:
              'To work efficiently, you need the right devices — good tools lay the foundation for productivity.',
          })}
        />

        <GridLayout
          columns={GridConfigs.devices}
          gap="gap-5"
          className="max-w-4xl mx-auto"
        >
          {DEVICE_LIST.map((device, index) => (
            <div key={index} className="h-full">
              <DeviceCard {...device} />
            </div>
          ))}
        </GridLayout>
      </div>
    </Section>
  );
}
