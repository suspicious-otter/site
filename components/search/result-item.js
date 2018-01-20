import Link from "next/link";
import classNames from "classnames";

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
          background-color: black;
          border: 0.125em solid black;
          border-radius: 0.25em;
          box-sizing: border-box;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          transition: all 0.15s;
          padding: 1em;
          height: 100px;
          width: 100%;
        }
        div:hover {
          background-color: white;
          border-color: black;
          color: black;
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
