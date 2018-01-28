import { H3 } from "components/ui/heading";

export default ({ list, title, item, ...props }) => (
  <section {...props}>
    <H3>{title}</H3>

    {list.map(item)}

    <style jsx>{`
      section {
        display: flex;
        align-items: stretch;
        justify-content: center;
        flex-wrap: wrap;
        margin: 1em 0;
      }

      section > :global(h3) {
        text-align: center;
        width: 100%;
      }
    `}</style>
  </section>
);
