import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { IStore } from "../../stores/IStore";

import GameGrid from "../game_grid/GameGrid";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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

  handleDialogClose = () => {
    this.store.clearGameOverReason();
  };

  onCardClick = (word: string) => {
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

        <Dialog
          open={
            this.store.game.status === GameStatus.Over &&
            !!this.store.game.gameOverReason
          }
          onClose={this.handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
          maxWidth="sm"
        >
          <DialogTitle id="alert-dialog-title">{"Game Over!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.store.game.gameOverReason}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default Game;
