import { H4 } from "components/ui/heading";

export default () => (
  <footer>
    <div>
      <H4>EdTech</H4>
    </div>

    <style jsx>{`
      footer {
        grid-area: footer;
        display: grid;
        background-color: black;
        color: white;
        padding: 2em 1em;
      }
    `}</style>
  </footer>
);
