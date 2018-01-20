import { Component } from "react";
import Head from "next/head";
import { isLocal, hasInitialized, initGA, logPageView } from "utils/analytics";

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
