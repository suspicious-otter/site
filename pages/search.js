import { Component } from "react";
import Link from "next/link";
import Router from "next/router";
import Head from "next/head";
import classNames from "classnames";
import accents from "remove-accents";
import NProgress from "nprogress";

import SearchForm from "components/search/form";
import SearchResultItem from "components/search/result-item";
import { H1, H3 } from "components/ui/heading";

import searchResults from "data/search-results.json";

import Main from "layouts/main";

import { IDLE, FETCHING } from "utils/constants";
import delay from "utils/delay";
import getPage from "utils/get-page";
import withTimer from "utils/with-timer";

class SearchPage extends Component {
  static async getInitialProps(context) {
    const { query } = context.query;

    if (query) return { query, results: searchResults };
    return { query, results: [] };
  }

  state = {
    query: this.props.query,
    results: this.props.results,
    status: IDLE
  };

  handleChange = event => {
    const query = accents.remove(event.target.value);

    this.updateURL(query);

    this.setState({ query });

    if (query.length > 0) this.fetchResults(query);
    else this.setState({ results: [] });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.fetchResults(this.state.query);
  };

  updateURL = query => {
    const { href, as } = getPage("search", {}, { query });
    Router.replace(href, as, { shallow: true });
  };

  fetchResults = async query => {
    if (query.length === 0) return this.setState({ results: [] });
    this.props.setTimer(async () => {
      this.setState({ status: FETCHING }, NProgress.start);
      await delay(500);
      this.setState({ results: searchResults, status: IDLE }, NProgress.done);
    }, 300);
  };

  render() {
    return (
      <Main id="search">
        <Head>
          <title>EdTech</title>
        </Head>

        <section
          id="search-box"
          className={classNames({
            "has-results": this.state.results.length > 0
          })}
        >
          <header>
            <H1>
              <Link href="/search" as="/">
                <a>EdTech</a>
              </Link>
            </H1>
          </header>

          <SearchForm
            value={this.state.query}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
          />
        </section>

        {this.state.results.length > 0 && (
          <section id="search-results">
            <section id="search-results-courses">
              <H3>Courses</H3>
              {this.state.results
                .filter(result => result.type === "course")
                .map(result => (
                  <article key={result.id}>
                    <SearchResultItem {...result} />
                  </article>
                ))}
            </section>

            <section id="search-results-materials">
              <H3>Lessons</H3>
              {this.state.results
                .filter(result => result.type === "material")
                .map(result => (
                  <article key={result.id}>
                    <SearchResultItem key={result.id} {...result} />
                  </article>
                ))}
            </section>
          </section>
        )}

        <style jsx>{`
          :global(#search) {
            animation-name: load;
            animation-duration: 1000ms;
          }

          section {
            max-width: 1000px;
            margin: 0 auto;
          }

          #search-box {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            position: relative;
            transition: all 0.5s;
            height: 100vh;
          }

          #search-box.has-results {
            padding-top: 10em;
            height: 20vh;
          }

          header {
            position: absolute;
            top: 0.5em;
            left: 0;
            right: 0;
            text-align: center;
          }

          header a {
            color: black;
            text-decoration: none;
          }

          #search-results-courses,
          #search-results-materials {
            display: flex;
            align-items: stretch;
            justify-content: center;
            flex-wrap: wrap;
            margin: 1em 0;
          }

          #search-results-courses > :global(h3),
          #search-results-materials > :global(h3) {
            text-align: center;
            width: 100%;
          }

          #search-results-courses > article {
            margin: 2.5%;
            width: 45%;
          }

          #search-results-materials > article {
            margin: 1.5%;
            width: 30%;
          }

          @keyframes load {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
        `}</style>
      </Main>
    );
  }
}

export default withTimer(SearchPage);
