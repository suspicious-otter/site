import { Fragment } from "react";

import * as colors from "utils/colors";

export function Input(props) {
  return (
    <Fragment>
      <input {...props} />
      <style jsx>{`
        input {
          border: none;
          border-bottom: 2px solid ${colors.grey};
          box-sizing: border-box;
          display: block;
          font-size: 1.5em;
          outline: none;
          padding: 0.5em 1em;
          transition: all 0.3s;
          width: 100%;
        }

        input:focus {
          border-bottom-color: ${colors.black};
        }
      `}</style>
    </Fragment>
  );
}

export function Select({ children, ...props }) {
  return (
    <select {...props}>
      {children}
      <style jsx>{`
        select {
          background-color: ${colors.white};
          border: none;
          border-bottom: 2px solid ${colors.grey};
          border-radius: none;
          box-sizing: border-box;
          display: block;
          font-size: 1.5em;
          outline: none;
          padding: 0.5em 1em;
          transition: all 0.3s;
          flex: 1;
        }

        select:focus {
          border-bottom-color: ${colors.black};
        }
      `}</style>
    </select>
  );
}
