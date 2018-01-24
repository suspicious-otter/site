import Link from "next/link";

import getPage from "utils/get-page";

function className(page, match) {
  return page === match && "isActive";
}

function NavBar({ page }) {
  return (
    <nav>
      <ul>
        <li>
          <Link {...getPage("search")} prefetch>
            <a className={className(page, "search")}>Courses</a>
          </Link>
        </li>
        <li>
          <Link {...getPage("forum-board")} prefetch>
            <a className={className(page, "forum-board")}>Community</a>
          </Link>
        </li>
        <li>
          <Link {...getPage("roadmap")} prefetch>
            <a className={className(page, "roadmap")}>Roadmap</a>
          </Link>
        </li>
        <li>
          <Link {...getPage("notifications")} prefetch>
            <a className={className(page, "notifications")}>Notifications</a>
          </Link>
        </li>
        <li>
          <Link {...getPage("login")} prefetch>
            <a className={className(page, "login")}>Login</a>
          </Link>
        </li>
      </ul>

      <style jsx>{`
        a {
          color: grey;
          text-decoration: none;
          transition: all 150ms;
        }
        a:hover {
          color: black;
        }
        a.isActive {
          color: black;
        }
        ul {
          list-style-type: none;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding-left: 0;
          line-height: 2;
          flex-direction: column;
        }
        li {
          margin: 0 0.5em;
          font-size: 0.9em;
          text-transform: uppercase;
          font-weight: 400;
          vertical-align: middle;
        }
        li:first-child {
          margin-left: 1em;
        }
        li:last-child {
          margin-right: 1em;
        }
        @media (min-width: 720px) {
          ul {
            flex-direction: row;
          }
        }
      `}</style>
    </nav>
  );
}

export default NavBar;
