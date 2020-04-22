import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Form, Button } from "react-bootstrap";

import { IStore } from "../../stores/IStore";

import "./login.css";

interface IProps {
  store?: IStore;
}

interface IState {
  name: string;
}

@inject("store")
@observer
class Login extends Component<IProps, IState> {
  private inputRef: any;

  private get store(): IStore {
    return this.props.store as IStore;
  }

  constructor(props: IProps) {
    super(props);
    this.state = { name: "" };

    this.handleChange = this.handleChange.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
  }

  render() {
    return (
      <Form className="form" onSubmit={this.onSubmit}>
        <Form.Group controlId="formPlaintextEmail">
          <Form.Label className="label">Name</Form.Label>
          <Form.Control
            plaintext
            placeholder="your name goes here"
            className="input"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Button
          variant="primary"
          size="lg"
          block
          className="primary-button"
          onClick={this.onSignIn}
        >
          Sign In
        </Button>
      </Form>
    );
  }

  private handleChange(event: any) {
    this.setState({ name: event.target.value } as IState);
  }

  private onSubmit = (event: any) => {
    event.preventDefault();
    this.onSignIn();
  };

  private onSignIn = async () => {
    await this.store.signIn(this.state.name);

    if (this.inputRef) {
      this.inputRef.value = "";
    }
  };
}

export default Login;
