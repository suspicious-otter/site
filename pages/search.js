import { Component } from "react";
import Router from "next/router";
import classNames from "classnames";
import accents from "remove-accents";
import NProgress from "nprogress";

import Main from "layouts/main";
import SearchForm from "components/search/form";
import SearchResultItem from "components/search/result-item";
import { H1, H3 } from "components/ui/heading";

import searchResults from "data/search-results.json";

import { IDLE, FETCHING, ERROR } from "utils/constants";
import delay from "utils/delay";
import getPage from "utils/get-page";

export default class SearchPage extends Component {
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

    const { href, as } = getPage("search", {}, { query });
    Router.push(href, as, { shallow: true });

    this.setState({ query });
    if (query.length > 3) this.fetchResults(query);
    if (query.length <= 3) this.setState({ results: [] });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.fetchResults(this.state.query);
  };

  fetchResults = async query => {
    if (this.timer) clearTimeout(this.timer);

    this.timer = setTimeout(async () => {
      this.setState({ status: FETCHING }, NProgress.start);
      await delay(500);
      this.setState({ results: searchResults, status: IDLE }, NProgress.done);
    }, 300);
  };

  get isFetching() {
    return this.state.status === FETCHING;
  }

  get hasResults() {
    return this.state.results.length > 0;
  }

  get resultCourses() {
    return this.state.results.filter(result => result.type === "course");
  }

  get resultMaterials() {
    return this.state.results.filter(result => result.type === "material");
  }

  render() {
    return (
      <Main>
        <section
          id="search-box"
          className={classNames({
            "has-results": this.hasResults
          })}
        >
          <header>
            <H1>EdTech</H1>
          </header>
          <SearchForm
            placeholder="¿Qué quieres aprender?"
            value={this.state.query}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
          />
        </section>

        {this.hasResults && (
          <section id="search-results">
            <section id="search-results-courses">
              <H3>Cursos</H3>
              {this.resultCourses.map(result => (
                <article key={result.id}>
                  <SearchResultItem {...result} />
                </article>
              ))}
            </section>

            <section id="search-results-materials">
              <H3>Materiales</H3>
              {this.resultMaterials.map(result => (
                <article key={result.id}>
                  <SearchResultItem key={result.id} {...result} />
                </article>
              ))}
            </section>
          </section>
        )}

        <style jsx>{`
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

          #search-results-courses > article,
          #search-results-materials > article {
            margin: 1.5%;
            width: 30%;
          }
        `}</style>
      </Main>
    );
  }
}
