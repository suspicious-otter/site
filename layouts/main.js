import { Component } from "react";
import Head from "next/head";
import { isLocal, hasInitialized, initGA, logPageView } from "utils/analytics";

import Header from "components/layout/header";
import Footer from "components/layout/footer";

export default class extends Component {
  componentDidMount() {
    if (isLocal()) return;

    if (!hasInitialized()) {
      initGA();
    }

    logPageView();
  }

  render() {
    const { children, ...props } = this.props;
    return (
      <main {...props}>
        <Head>
          <link rel="stylesheet" href="/static/nprogress.css" />
        </Head>

        <Header page={props.page} />

        <section id="content">{children}</section>

        {/* <Footer /> */}

        <style jsx global>{`
          body {
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
            margin: 0;
            font-size: 1rem;
            font-weight: 200;
          }
          ::selection {
            background-color: black;
            color: white;
          }
        `}</style>

        <style jsx>{`
          main {
            max-width: 62em;
            margin: 0 auto;

            animation-name: load;
            animation-duration: 1000ms;
            display: grid;
            min-height: 100vh;
            grid-template-areas:
              "header"
              "content"
              "footer";
            grid-template-rows: 60px auto auto;
            grid-column: 1;
            grid-row: 3;
            transition: all 300ms;
          }

          #content {
            grid-area: content;
          }

          @keyframes load {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
        `}</style>
      </main>
    );
  }
}
