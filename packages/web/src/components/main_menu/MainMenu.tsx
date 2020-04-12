import React, { Component } from "react";

import { inject, observer } from "mobx-react";
import { Form, Button, Modal } from "react-bootstrap";

import { IStore } from "../../stores/IStore";

import Login from "../login/login";

interface IProps {
  store?: IStore;
}

interface IState {
  show: boolean;
  gameId: string;
}

@inject("store")
@observer
class MainMenu extends Component<IProps, IState> {
  private get store(): IStore {
    return this.props.store as IStore;
  }

  constructor(props: IProps) {
    super(props);
    this.state = { show: false, gameId: "" };

    this.onCreateGame = this.onCreateGame.bind(this);
    this.onJoinGame = this.onJoinGame.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.handleGameIdChange = this.handleGameIdChange.bind(this);
  }

  render() {
    if (!this.props.store?.user.isSignedIn) {
      return <Login />;
    }

    // TODO: pull into its own component
    return (
      <>
        <Form className="main-menu">
          <Button
            variant="primary"
            size="lg"
            block
            className="primary-button"
            onClick={this.onCreateGame}
          >
            Create New Game
          </Button>
          <br />
          <Button
            variant="primary"
            size="lg"
            block
            className="primary-button"
            onClick={this.handleShow}
          >
            Join Existing Game
          </Button>
        </Form>
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Enter ID of game to join</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="form">
              <Form.Group controlId="formPlaintextEmail">
                <Form.Control
                  plaintext
                  placeholder="game ID goes here"
                  className="input"
                  value={this.state.gameId}
                  onChange={this.handleGameIdChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.onJoinGame}>
              Join Game
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  private onCreateGame = async () => {
    await this.store.createGame();
  };

  private onJoinGame = async () => {
    await this.store.joinGame(this.state.gameId);
  };

  private handleShow = async () => {
    this.setState({ ...this.state, show: true });
  };

  private handleClose = async () => {
    this.setState({ ...this.state, show: false });
  };

  private handleGameIdChange(event: any) {
    this.setState({ ...this.state, gameId: event.target.value });
  }
}

export default MainMenu;
