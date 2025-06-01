import React from 'react';

export default function ProgressCircle({ unit, total, value }) {
  return (
    <div className="relative w-[150px] h-[150px] flex justify-center items-center">
      <svg className="relative w-[150px] h-[150px] rotate-[270deg]">
        <circle 
          cx="70" 
          cy="70" 
          r="70" 
          className="w-full h-full fill-transparent stroke-[8] stroke-gray-200 dark:stroke-gray-800 stroke-[round] translate-x-[5px] translate-y-[5px]"
        />
        <circle 
          cx="70" 
          cy="70" 
          r="70" 
          className="w-full h-full fill-transparent stroke-[8] stroke-[var(--ifm-color-primary)] stroke-[round] translate-x-[5px] translate-y-[5px]"
          style={{ 
            strokeDasharray: 440,
            strokeDashoffset: 440 - 440 * value / total 
          }}
        />
      </svg>
      <div 
        className="absolute w-full h-full rounded-full flex justify-center items-start before:content-[''] before:absolute before:-top-[3px] before:w-[15px] before:h-[15px] before:bg-[var(--ifm-color-primary)] before:rounded-full before:shadow-[0_0_20px_var(--ifm-color-primary),0_0_60px_var(--ifm-color-primary)]"
        style={{ transform: `rotateZ(${ 360 * value / total }deg)` }}
      />
      <div className="absolute text-center font-medium text-[2.5rem] select-none">
        {value}
        <br />
        <span className="absolute text-[0.5rem] font-light -translate-x-1/2 -translate-y-[10px] tracking-[0.1em] uppercase select-none">{unit}</span>
      </div>
    </div>
  );
}
