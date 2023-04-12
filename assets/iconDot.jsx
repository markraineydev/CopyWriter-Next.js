import * as React from 'react';

function IconDot({ props, fill = '#9CA3AF' }) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx={12} cy={12} r={3} fill={fill} />
    </svg>
  );
}

export default IconDot;
