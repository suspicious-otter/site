import { Component } from "react";
import Head from "next/head";

import { H1, H4 } from "components/ui/heading";
import Topic from "components/forum/board/topic";
import Toolbar from "components/forum/toolbar";

import Main from "layouts/main";

import topics from "data/topics.json";

class ForumBoard extends Component {
  static async getInitialProps() {
    return { topics };
  }

  render() {
    return (
      <Main page="forum-board" animation="fadeIn slideUp">
        <Head>
          <title>EdTech - Community</title>
        </Head>

        <H1>Community forum</H1>

        <Toolbar />

        <section id="board">
          {this.props.topics.map(topic => <Topic key={topic.id} {...topic} />)}
        </section>
      </Main>
    );
  }
}

export default ForumBoard;
