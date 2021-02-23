import Document, { Html, Head, Main, NextScript } from 'next/document';

// Colocamos as fontes e os demais arquivos no _document pois o usuário só carrega isto 1 vez ao acessar nosso site, ja o _app ele vai ser sempre usado, só que recalculado, o que geraria 1 processo a mais
export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>

          <link rel="shortcut icon" href="favicon.png" type="image/png" />

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}