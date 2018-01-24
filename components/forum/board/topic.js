import classnames from "classnames";

import timeAgo from "date-fns/distance_in_words_to_now";

import { H3 } from "components/ui/heading";
import { P } from "components/ui/text";
import { Anchor } from "components/ui/link";

import * as colors from "utils/colors";
import getPage from "utils/get-page";

export default ({
  title,
  publishedAt,
  displayName,
  category,
  id,
  answers,
  answered
}) => {
  const date = timeAgo(new Date(publishedAt), { addSuffix: true });

  return (
    <Anchor {...getPage("forum-topic", { category, topic: id })}>
      <article className={classnames({ answered })}>
        <div className="body">
          <H3>{title}</H3>
          <P>
            Asked <strong>{date}</strong> by <strong>{displayName}</strong>
          </P>
        </div>

        <div className="count">
          <span>
            {answered && <strong>✓</strong>}
            {answers}
          </span>
          <br />Answers
        </div>
      </article>
      <style jsx>{`
        article {
          border-bottom: 1px solid ${colors.gray};
          box-sizing: border-box;
          display: flex;
          align-items: center;
          padding: 0.5em 1em;
          width: 100%;
        }

        .body {
          flex: 1;
        }

        .count {
          font-size: 1em;
          text-align: center;
          display: none;
        }

        .count > span {
          font-size: 2em;
          font-weight: normal;
        }

        .answered .count {
          color: ${colors.green};
        }

        @media (min-width: 720px) {
          .count {
            display: block;
          }
        }
      `}</style>
    </Anchor>
  );
};
