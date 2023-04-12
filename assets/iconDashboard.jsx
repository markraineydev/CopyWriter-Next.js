import * as React from 'react';

function IconDashboard({ color = '#9CA3AF' }) {
  return (
    <svg width={18} height={18} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 10l2-2m0 0l7-7 7 7M3 8v10a1 1 0 001 1h3M17 8l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default IconDashboard;
