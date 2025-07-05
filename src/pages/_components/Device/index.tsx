import React from 'react';
import { DEVICE_LIST } from '../../../data/device';
import { BaseCard, Section, SectionHeader, GridLayout, GridConfigs, TEXT_COLORS } from '../common';
import { translate } from '@docusaurus/Translate';

function DeviceCard({ title, icon }: { title: string; icon: string }) {
  return (
    <BaseCard isClickable={false} className="p-6 items-center justify-center">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="flex justify-center items-center h-12 w-12">
          <img src={icon} alt={title} className="w-12 h-12 object-contain" />
        </div>
        <h3 className={`font-semibold text-lg ${TEXT_COLORS.PRIMARY} leading-snug`}>{title}</h3>
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
            message: 'To work efficiently, you need the right devices — good tools lay the foundation for productivity.',
          })}
        />

        <GridLayout columns={GridConfigs.devices} gap="gap-5" className="max-w-4xl mx-auto">
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
