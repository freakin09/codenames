import React, { Component } from "react";
import { Message, Segment } from "semantic-ui-react";

class Rules extends Component<{}, {}> {
  render() {
    return (
      <div>
        <Message as="h4" attached="top">
          How to play!
        </Message>

        <Segment attached={true}>
          <ul>
            <h5>How To</h5>
            <li>Sign in with any name to play</li>
            <li>
              Afer successfully signing in you can either create a new game or
              join an existing one
            </li>
            <li>
              If creating a new game, you will get a game ID which you can share
              with people you wish join the game
            </li>
            <li>
              To join an existing game simply click "Join Game" and enter the ID
              of the game you want to join
            </li>
          </ul>
        </Segment>
      </div>
    );
  }
}

export default Rules;
