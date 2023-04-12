import * as React from 'react';

function IconDocument(props) {
  return (
    <svg width={16} height={18} viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3 19h10a2 2 0 002-2V7.414a1 1 0 00-.293-.707L9.293 1.293A1 1 0 008.586 1H3a2 2 0 00-2 2v14a2 2 0 002 2z"
        stroke={props.color || '#9CA3AF'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default IconDocument;
