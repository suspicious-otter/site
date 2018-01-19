export default ({ onChange, onSubmit, value }) => (
  <form onSubmit={onSubmit}>
    <label htmlFor="query">¿Qué quieres aprender?</label>
    <input
      name="query"
      id="query"
      onChange={onChange}
      value={value}
      type="search"
    />

    <style jsx>{`
      form {
        font-size: 1.5em;
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
        font-size: 1em;
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