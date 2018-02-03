// Packages
import { Component } from "react";
import Router from "next/router";

import { IS_SERVER } from "utils/constants";

export function redirectTo(destination, { res, status } = {}) {
  if (IS_SERVER) {
    res.writeHead(status || 302, { Location: destination });
    res.end();
  } else {
    // if it starts with `/` but not with `//`
    if (destination[0] === "/" && destination[1] !== "/") {
      Router.push(destination);
    } else {
      window.location = destination;
    }
  }
}

export default (destination, status = 301) => {
  class RedirectRoute extends Component {
    static getInitialProps({ res }) {
      redirectTo(destination, { res, status });
      return {};
    }
  }

  return RedirectRoute;
};
