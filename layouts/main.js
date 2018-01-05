import { Component } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import { isLocal, hasInitialized, initGA, logPageView } from 'utils/analytics';

Router.onRouteChangeStart = url => {
  console.log(`Loading: ${url}`);
  NProgress.start();
};
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
        {children}
      </main>
    );
  }
}