import { Component } from "react";

function withTimer(WrappedComponent) {
  class WithTimer extends Component {
    timer = null;

    setTimer = (callback, ms) => {
      this.clearTimer();
      this.timer = setTimeout(callback, ms);
    };

    clearTimer = () => clearTimeout(this.timer);

    componentWillUnmount() {
      this.clearTimer();
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          setTimer={this.setTimer}
          clearTimer={this.clearTimer}
        />
      );
    }
  }

  if (
    WrappedComponent.getInitialProps &&
    typeof WrappedComponent.getInitialProps === "function"
  ) {
    WithTimer.getInitialProps = WrappedComponent.getInitialProps;
  }

  return WithTimer;
}

export default withTimer;
