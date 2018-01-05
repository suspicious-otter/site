import Document, { Head, Main, NextScript } from 'next/document';
import htmlescape from 'htmlescape';

const { NODE_ENV, GA_ID } = process.env;
const env = { NODE_ENV, GA_ID };

export default class extends Document {
  render() {
    return (
      <html lang="es">
        <Head />
        <body>
          <Main />
          <script
            id="env"
            dangerouslySetInnerHTML={{ __html: '__ENV__ = ' + htmlescape(env) }}
          />
          <NextScript />
        </body>
      </html>
    );
  }
}
