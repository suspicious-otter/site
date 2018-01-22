import Link from "next/link";

import NavBar from "components/layout/navbar";

import { H2 } from "components/ui/heading";

import getPage from "utils/get-page";

export default ({ page }) => (
  <header>
    <H2>
      <Link {...getPage("search")} prefetch>
        <a>EdTech</a>
      </Link>
    </H2>

    <NavBar page={page} />

    <style jsx>{`
      header {
        grid-area: header;
        display: flex;
        justify-content: space-between;
      }

      header a {
        color: black;
        text-decoration: none;
      }
    `}</style>
  </header>
);
