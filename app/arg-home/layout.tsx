// app/layout.tsx
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // <div>
    //   {children}  {/* Render the children (pages/components inside this layout) */}
    // </div>
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  );
}