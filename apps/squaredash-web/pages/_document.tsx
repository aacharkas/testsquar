import Document, {Html, Head, Main, NextScript} from 'next/document';
import i18nextConfig from '../next-i18next.config';

class MyDocument extends Document {
  render() {
    const currentLocale = this.props.__NEXT_DATA__.query.locale || i18nextConfig.i18n.defaultLocale;
    return (
      <Html lang={currentLocale as string}>
        <Head>
          <link rel="manifest" href="/manifest.json"/>
          <link rel="shortcut icon" href="https://dev-squaredash-public.s3.amazonaws.com/logo.ico"/>
          <link rel="apple-touch-icon" href="https://dev-squaredash-public.s3.amazonaws.com/logo.png"/>
          <meta name="theme-color" content="#fff"/>
        </Head>
        <body>
          <Main/>
          <NextScript/>
        </body>
        <script src="https://documentcloud.adobe.com/view-sdk/main.js"/>
      </Html>
    );
  }
}

export default MyDocument;
