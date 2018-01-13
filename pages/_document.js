import Document, { Head, Main, NextScript } from "next/document";

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
            type="application/json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(env)
            }}
          />
          <NextScript />
        </body>
      </html>
    );
  }
}
