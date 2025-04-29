// import Script from 'next/script';
// import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script';
 
// app/layout.tsx 或 page.tsx
import { cn } from "@/lib/utils";
import { fontCarat } from "@/assets/fonts";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" >
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-FP01S99JY0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FP01S99JY0');
          `}
        </Script>
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-FZCK9PB2KG"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config ', 'G-FZCK9PB2KG');
        </script> */}
      </head>
      <body className={cn("antialiased", fontCarat.variable)} style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}