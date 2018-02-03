import { H5 } from "components/ui/heading";
import { Input, Select } from "components/ui/form";

import * as colors from "utils/colors";

export default () => {
  return (
    <div className="toolbar">
      <form className="main">
        <label htmlFor="query">
          <H5>Search</H5>
        </label>
        <Input type="search" id="query" />
      </form>

      <form className="filter">
        <label htmlFor="filterBy">
          <H5>Filter by</H5>
        </label>
        <Select id="filterBy">
          <option value="popular">Popular</option>
          <option value="newest">Newest</option>
          <option value="unanswered">Unanswered</option>
        </Select>
      </form>

      <style jsx>{`
        .toolbar {
          display: flex;
          align-items: center;
        }

        form {
          font-size: 1em;
          display: flex;
          align-items: center;
        }

        label {
          display: block;
          padding: 0 1em;
        }

        .main {
          width: 70%;
        }

        .filter {
          width: 30%;
        }
      `}</style>
    </div>
  );
};
