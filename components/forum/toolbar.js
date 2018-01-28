import { H5 } from "components/ui/heading";
import * as colors from "utils/colors";

export default () => {
  return (
    <div className="toolbar">
      <form>
        <label htmlFor="query">
          <H5>Search</H5>
        </label>
        <input type="search" id="query" />
      </form>

      <div className="filter">
        <label htmlFor="filterBy">
          <H5>Filter by</H5>
        </label>
        <select id="filterBy">
          <option value="popular">Popular</option>
          <option value="newest">Newest</option>
          <option value="unanswered">Unanswered</option>
        </select>
      </div>

      <style jsx>{`
        .toolbar {
          display: flex;
          align-items: center;
        }

        form {
          font-size: 1em;
          flex: 1;
          display: flex;
          align-items: center;
        }

        label {
          display: block;
          padding: 0 1em;
        }

        input,
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

        input:focus,
        select:focus {
          border-bottom-color: ${colors.black};
        }

        .filter {
          display: flex;
          width: 40%;
        }
      `}</style>
    </div>
  );
};
