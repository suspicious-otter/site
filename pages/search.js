import { Component } from "react";
import Link from "next/link";
import Router from "next/router";
import Head from "next/head";
import classNames from "classnames";
import accents from "remove-accents";
import NProgress from "nprogress";
import Transition from "react-transition-group/Transition";

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
    const { query = "" } = context.query;

    if (query) return { query, results: searchResults };
    return { query, results: [] };
  }

  state = {
    query: this.props.query,
    results: this.props.results,
    status: IDLE
  };

  componentWillReceiveProps(nextProps) {
    const { query = "" } = nextProps.url.query;
    if (this.props.url.query.query !== query && this.state.query !== query) {
      this.setState({ query }, () => this.fetchResults(query));
    }
  }

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
    Router.push(href, as, { shallow: true });
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
      <Main page="search">
        <Head>
          {this.state.query.length > 0 ? (
            <title>EdTeach - Searching for {this.state.query}</title>
          ) : (
            <title>EdTech</title>
          )}
        </Head>

        <section id="search-box">
          <SearchForm
            value={this.state.query}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
          />
        </section>

        <Transition
          in={this.state.results.length > 0}
          timeout={300}
          mountOnEnter
          unmountOnExit
          exit={false}
        >
          {state => (
            <section id="search-results" className={state}>
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
        </Transition>

        <style jsx>{`
          #search-box {
            width: 100%;
          }

          #search-results {
            transition: all 300ms ease-in-out;
            opacity: 0;
            width: 100%;
          }

          #search-results.entering {
            opacity: 0;
          }

          #search-results.entered {
            opacity: 1;
          }

          #search-results.exiting {
            opacity: 1;
          }

          #searct-results.exited {
            opacity: 0;
          }

          #search-box {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
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
            margin: 2em 2.5%;
            width: 45%;
          }

          #search-results-materials > article {
            margin: 1em 1.5%;
            width: 30%;
          }
        `}</style>
      </Main>
    );
  }
}

export default withTimer(SearchPage);
