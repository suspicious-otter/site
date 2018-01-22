import { H1 } from "components/ui/heading";

export default ({ onChange, onSubmit, value = "" }) => (
  <form onSubmit={onSubmit}>
    <label htmlFor="query">
      <H1>What do you want to learn?</H1>
    </label>

    <input
      name="query"
      id="query"
      onChange={onChange}
      value={value}
      type="search"
      autoFocus
    />

    <style jsx>{`
      form {
        font-size: 1em;
        width: 80%;
      }

      label {
        display: block;
        padding: 0 1em;
        width: 100%;
      }

      input {
        border: none;
        border-bottom: 2px solid lightgrey;
        box-sizing: border-box;
        display: block;
        font-size: 1.5em;
        outline: none;
        padding: 0.5em 1em;
        transition: all 0.3s;
        width: 100%;
      }

      input:focus {
        border-bottom-color: black;
      }
    `}</style>
  </form>
);
