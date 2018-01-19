import { Component } from "react";
import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import { isLocal, hasInitialized, initGA, logPageView } from "utils/analytics";

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

export default class extends Component {
  componentDidMount() {
    if (isLocal()) return;

    if (!hasInitialized()) {
      initGA();
    }

    logPageView();
  }

  render() {
    const { children } = this.props;
    return (
      <main>
        <Head>
          <link rel="stylesheet" href="/static/nprogress.css" />
        </Head>
        {children}
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
      </main>
    );
  }
}
