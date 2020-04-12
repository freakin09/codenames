import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { IStore } from "../../stores/IStore";

import { GameStatus } from "@codenames/common";

import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

interface IProps {
  store?: IStore;
}

@inject("store")
@observer
class NewGameModal extends Component<IProps, {}> {
  private get store(): IStore {
    return this.props.store as IStore;
  }

  constructor(props: IProps) {
    super(props);

    this.onStartGame = this.onStartGame.bind(this);
  }

  private get formattedPlayerNames() {
    return this.store.game.players?.map((player) => {
      return (
        <h4>
          {player}
          <br />
        </h4>
      );
    });
  }

  private onStartGame = async () => {
    await this.store.startGame();
  };

  render() {
    if (this.store.game.status !== GameStatus.New) {
      throw new Error("Cards need to be present");
    }

    return (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Game Id: {this.store.game.id}</Modal.Title>
        </Modal.Header>

        <Modal.Body>{this.formattedPlayerNames}</Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={this.onStartGame}>
            Start Game
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  }
}

export default NewGameModal;
