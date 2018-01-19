import classNames from "classnames";
import Link from "data-prefetch-link";

import { H5, H6 } from "components/ui/heading";

import getPage from "utils/get-page";

export default ({ id, type, title, level, courseSlug, materialSlug }) => (
  <Link
    {...getPage(type === "course" ? "course-detail" : "course-material", {
      course: courseSlug,
      material: materialSlug
    })}
  >
    <a>
      <div
        id={`${type}-${id}`}
        className={classNames({
          isCourse: type === "course",
          isMaterial: type === "material",
          isBasics: level === "basics",
          isSpecialization: level === "specialization",
          isWorkshop: level === "workshop"
        })}
      >
        {type === "course" ? <H6>{title}</H6> : <H5>{title}</H5>}
      </div>

      <style jsx>{`
        a {
          color: black;
          text-decoration: none;
          user-select: none;
        }

        div {
          background-color: white;
          border: 1px solid gray;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 1em;
          height: 100px;
          width: 100%;
        }
        div:hover {
          background-color: black;
          border-color: black;
          color: white;
        }

        div.isCourse {
          height: 70px;
        }
        div.isMaterial {
          height: 100px;
        }
        div.is-basics {
          border-color: gray;
        }
        div.is-specialization {
          border-color: gray;
        }
        div.is-workshop {
          border-color: gray;
        }
      `}</style>
    </a>
  </Link>
);
