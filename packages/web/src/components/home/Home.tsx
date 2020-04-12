import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";

import { IStore } from "../../stores/IStore";

import Rules from "../rules/Rules";
import MainMenu from "../main_menu/MainMenu";
import Game from "../game/Game";
import GameHeader from "../game_header/GameHeader";

import "./home.css";

interface IProps {
  store?: IStore;
}

@inject("store")
@observer
class Home extends Component<IProps, {}> {
  private get store(): IStore {
    return this.props.store as IStore;
  }

  constructor(props: IProps) {
    super(props);
  }

  render() {
    if (!this.store.game.id) {
      return (
        <Fragment>
          <Rules />
          <MainMenu />
        </Fragment>
      );
    }

    return (
      <Fragment>
        <GameHeader />
        <Game />
      </Fragment>
    );
  }
}

export default Home;
