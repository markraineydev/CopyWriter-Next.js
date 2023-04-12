import * as React from 'react';

function IconAIOutput(props) {
  return (
    <svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M17 10V3a2 2 0 00-2-2H3a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H3a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293H7.414a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 003.586 10H1"
        stroke={props.icon || '#9CA3AF'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default IconAIOutput;
