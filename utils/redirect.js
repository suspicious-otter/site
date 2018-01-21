// Packages
import { Component } from "react";
import Router from "next/router";

export function redirectTo(destination, { res, status } = {}) {
  if (res) {
    res.writeHead(status || 302, { Location: destination });
    res.end();
  } else {
    if (destination[0] === "/" && destination[1] !== "/") {
      Router.push(destination);
    } else {
      window.location = destination;
    }
  }
}

export default (destination, status = 301) =>
  class RedirectRoute extends Component {
    static getInitialProps({ res }) {
      redirectTo(destination, { res, status });
      return {};
    }
  };
