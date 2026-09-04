import React from 'react';

// Renders an inline SVG diagram (from the VCGMEDIA visual library) at full width.
export const DiagramVisual: React.FC<{ svg: string }> = ({ svg }) => (
  <div
    style={{ maxWidth: '100%', lineHeight: 0 }}
    dangerouslySetInnerHTML={{ __html: svg }}
  />
);
