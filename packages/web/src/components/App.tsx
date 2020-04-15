import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import { IStore } from "src/stores/IStore";

import Home from "./home/Home";

import "./App.css";

interface IProps {
  store?: IStore;
}

@inject("store")
@observer
class App extends Component<IProps, {}> {
  private get store(): IStore {
    return this.props.store as IStore;
  }

  constructor(props: IProps) {
    super(props);

    this.handleErrorClose = this.handleErrorClose.bind(this);
  }

  private handleErrorClose() {
    this.store.clearErrors();
  }

  render() {
    return (
      <>
        <Home />
        <Snackbar
          open={!!this.store.game.error}
          autoHideDuration={10000}
          onClose={this.handleErrorClose}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            severity="error"
            onClose={this.handleErrorClose}
          >
            {this.store.game.error}
          </MuiAlert>
        </Snackbar>
      </>
    );
  }
}

export default App;
