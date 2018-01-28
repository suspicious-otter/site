import { Component } from "react";
import Head from "next/head";
import { isLocal, hasInitialized, initGA, logPageView } from "utils/analytics";
import Transition from "react-transition-group/Transition";
import classnames from "classnames";

import Header from "components/layout/header";
import Footer from "components/layout/footer";

import * as colors from "utils/colors";

export default class extends Component {
  static defaultProps = {
    animationTiming: "ease-in-out",
    animationDuration: 300,
    exit: true
  };

  componentDidMount() {
    if (isLocal()) return;

    if (!hasInitialized()) {
      initGA();
    }

    logPageView();
  }

  render() {
    const {
      children,
      page,
      animation,
      animationDuration,
      animationTiming,
      exit,
      ...props
    } = this.props;

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

        <Header page={page} />

        <Transition in={true} timeout={animationDuration} appear exit={exit}>
          {state => (
            <section id="content" className={classnames(state, animation)}>
              {children}
            </section>
          )}
        </Transition>

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
            transition: all ${animationDuration}ms ${animationTiming};
          }

          /* fadeIn */
          #content.fadeIn {
            opacity: 0;
          }

          #content.fadeIn.entering {
            opacity: 0;
          }

          #content.fadeIn.entered {
            opacity: 1;
          }

          #content.fadeIn.exiting {
            opacity: 1;
          }

          #content.fadeIn.exited {
            opacity: 0;
          }

          /* slideUp */
          #content.slideUp {
            transform: translateY(50vh);
          }

          #content.slideUp.entering {
            transform: translateY(50vh);
          }

          #content.slideUp.entered {
            transform: translateY(0);
          }

          #content.slideUp.exiting {
            transform: translateY(0);
          }

          #content.slideUp.exited {
            transform: translateY(50vh);
          }

          /* slideDown */
          #content.slideDown {
            transform: translateY(-50vh);
          }

          #content.slideDown.entering {
            transform: translateY(-50vh);
          }

          #content.slideDown.entered {
            transform: translateY(0);
          }

          #content.slideDown.exiting {
            transform: translateY(0);
          }

          #content.slideDown.exited {
            transform: translateY(-50vh);
          }

          /* slideLeft */
          #content.slideLeft {
            transform: translateX(-100%);
          }

          #content.slideLeft.entering {
            transform: translateX(-100%);
          }

          #content.slideLeft.entered {
            transform: translateX(0);
          }

          #content.slideLeft.exiting {
            transform: translateX(0);
          }

          #content.slideLeft.exited {
            transform: translateX(-100%);
          }

          /* slideRight */
          #content.slideRight {
            transform: translateX(100%);
          }

          #content.slideRight.entering {
            transform: translateX(100%);
          }

          #content.slideRight.entered {
            transform: translateX(0);
          }

          #content.slideRight.exiting {
            transform: translateX(0);
          }

          #content.slideRight.exited {
            transform: translateX(100%);
          }
        `}</style>
      </main>
    );
  }
}
