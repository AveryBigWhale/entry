// app/layout.tsx
import React from 'react';
import Script from 'next/script';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // <div>
    //   {children}  {/* Render the children (pages/components inside this layout) */}
    // </div>
    <html lang="zh-TW">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-FZCK9PB2KG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FZCK9PB2KG');
          `}
        </Script>
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-FZCK9PB2KG"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-FZCK9PB2KG');
        </script> */}
      </head>
      <body>{children}</body>
    </html>
  );
}