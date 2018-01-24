import { Component } from "react";
import Head from "next/head";
import { isLocal, hasInitialized, initGA, logPageView } from "utils/analytics";

import Header from "components/layout/header";
import Footer from "components/layout/footer";

import * as colors from "utils/colors";

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
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="HandheldFriendly" content="True" />
          <meta name="MobileOptimized" content="320" />
          <meta name="theme-color" content={colors.black} />
          <meta content="IE=edge,chrome=1" httpEquiv="X-UA-Compatible" />
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
            display: grid;
            min-height: 100vh;
            grid-template-areas:
              "header"
              "content"
              "footer";
            grid-column: 1;
            grid-row: 3;
            transition: all 300ms;
          }

          #content {
            grid-area: content;

            animation-name: load;
            animation-duration: 1000ms;
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
