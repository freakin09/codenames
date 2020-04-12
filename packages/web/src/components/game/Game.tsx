import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { MuiThemeProvider } from "material-ui/styles";

import { IStore } from "../../stores/IStore";

import GameGrid from "../game_grid/GameGrid";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Row, Col } from "react-bootstrap";

import { GameStatus } from "@codenames/common";
import NewGameModal from "../new_game_modal/NewGameModal";
import SpyMasterGrid from "../spymaster_grid/SpyMasterGrid";

interface IProps {
  store?: IStore;
}

@inject("store")
@observer
class Game extends Component<IProps, {}> {
  private get store(): IStore {
    return this.props.store as IStore;
  }

  constructor(props: IProps) {
    super(props);
  }

  handleSnackbarClose = () => {
    this.store.clearNotifications();
  };

  onCardClick = (word: string) => {
    if (this.store.user.isSpymMaster) {
      this.store.setNotification("Spy Master cannot choose card");
      return;
    }
    this.store.chooseWord(word);
  };

  render() {
    if (this.store.game.status === GameStatus.New) {
      return <NewGameModal />;
    }

    if (this.store.game.cards == null || this.store.game.cards.length === 0) {
      throw new Error("Cards need to be present");
    }

    return (
      <>
        <Row>
          <Col md="auto">
            <GameGrid
              cards={this.store.game.cards}
              onCardClick={this.onCardClick}
            />
          </Col>
          <Col md="auto">
            {this.store.user.isSpymMaster && (
              <SpyMasterGrid cards={this.store.game.cards} />
            )}
          </Col>
        </Row>

        <MuiThemeProvider>
          <Snackbar
            open={this.store.newNotification}
            autoHideDuration={6000}
            onClose={this.handleSnackbarClose}
          >
            <MuiAlert
              onClose={this.handleSnackbarClose}
              elevation={6}
              variant="filled"
              severity="info"
            >
              {this.store.notification}
            </MuiAlert>
          </Snackbar>
        </MuiThemeProvider>
      </>
    );
  }
}

export default Game;
