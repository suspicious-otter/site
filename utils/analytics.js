import ReactGA from "react-ga";
import env from "utils/env";

export function isLocal() {
  return NODE_ENV !== "production";
}

export function hasInitialized() {
  if (typeof window !== "undefined") {
    return window.GA_INITIALIZED;
  }
  return false;
}

export function initGA() {
  ReactGA.initialize(env.GA_ID);
  window.GA_INITIALIZED = true;
}

export function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

export function logEvent(category = "", action = "") {
  if (category && action) {
    ReactGA.event({ category, action });
  }
}

export function logException(description = "", fatal = false) {
  if (description) {
    ReactGA.exception({ description, fatal });
  }
}
