import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="zh-TW">  {/* Set the default language for your HTML document */}
        <Head />  {/* Add any custom meta tags, links, etc. */}
        <body>
          <Main />  {/* This renders the content of your app */}
          <NextScript />  {/* This includes necessary Next.js scripts */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;