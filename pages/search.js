import { Component } from "react";
import Link from "next/link";
import Router from "next/router";
import Head from "next/head";
import classNames from "classnames";
import accents from "remove-accents";
import NProgress from "nprogress";
import Transition from "react-transition-group/Transition";

import SearchForm from "components/search/form";
import SearchResultList from "components/search/result-list";
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
      <Main page="search" animation="fadeIn" animationDuration={100}>
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
              <SearchResultList
                list={this.state.results.filter(
                  result => result.type === "course"
                )}
                title="Courses"
                item={result => (
                  <article key={result.id} className="courses">
                    <SearchResultItem {...result} />
                  </article>
                )}
              />

              <SearchResultList
                list={this.state.results.filter(
                  result => result.type === "material"
                )}
                title="Lessons"
                item={result => (
                  <article key={result.id} className="lessons">
                    <SearchResultItem {...result} />
                  </article>
                )}
              />
            </section>
          )}
        </Transition>

        <style jsx>{`
          #search-box {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            width: 100%;
          }

          #search-results {
            transition: all 300ms ease-in-out;
            opacity: 0;
            width: 100%;
          }

          #search-results.entering {
            opacity: 0;
            transform: translateY(25vh);
          }

          #search-results.entered {
            opacity: 1;
            transform: translateY(0);
          }

          #search-results.exiting {
            opacity: 1;
          }

          #searct-results.exited {
            opacity: 0;
          }

          #search-results .courses {
            margin: 1em 2.5%;
            width: 95%;
          }

          #search-results .lessons {
            margin: 1em 2.5%;
            width: 45%;
          }

          @media (min-width: 720px) {
            #search-results .courses {
              width: 45%;
            }

            #search-results .lessons {
              margin: 1em 1.5%;
              width: 30%;
            }
          }
        `}</style>
      </Main>
    );
  }
}

export default withTimer(SearchPage);
