import { H1 } from "components/ui/heading";
import { Input } from "components/ui/form";

export default ({ onChange, onSubmit, value = "" }) => (
  <form onSubmit={onSubmit}>
    <label htmlFor="query">
      <H1>What do you want to learn?</H1>
    </label>

    <Input
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
    `}</style>
  </form>
);
