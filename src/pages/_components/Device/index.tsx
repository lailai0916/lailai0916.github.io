import React from 'react';
import { DEVICES } from '../../../data/device';
import BaseCard from '../common/BaseCard';
import Section from '../common/Section';
import SectionHeader from '../common/SectionHeader';

function DeviceCard({ name, icon }: {
  name: string;
  icon: string;
}) {
  return (
    <BaseCard isClickable={false} className="p-5 items-center justify-center">
      <div className="flex flex-col items-center space-y-3">
        <div className="group-hover:scale-110 transition-transform duration-200">
          <img 
            src={icon} 
            alt={name}
            draggable="false"
            className="w-10 h-10 object-contain filter brightness-0 dark:invert transition-transform duration-200 select-none"
          />
        </div>
        <h3 className="font-medium text-base text-gray-900 dark:text-neutral-100 text-center leading-snug">
          {name}
        </h3>
      </div>
    </BaseCard>
  );
}

export default function Device() {
  return (
    <Section background={null}>
      <div className="max-w-7xl mx-auto flex flex-col px-5">
        <SectionHeader 
          title="我的设备"
          description="工欲善其事，必先利其器。优秀的工具是高效工作的基础"
        />
        
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {DEVICES.map((device, index) => (
            <div key={index} className="h-full">
              <DeviceCard {...device} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
