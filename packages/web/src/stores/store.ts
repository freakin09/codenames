import * as common from "@codenames/common";
import { computed, observable } from "mobx";
import { persist } from "mobx-persist";

import GameService from "../services/GameService";
import { IStore } from "./IStore";
import { IGame } from "./models/IGameInfo";
import { IUser } from "./models/IUserInfo";
import { GameStatus } from "@codenames/common";

interface IPlayer {
  name: string;
  id: string;
  isSpyMaster: boolean;
}

class Store implements IStore {
  @persist("object")
  @observable
  private gameInfo: IGame = {};

  @persist("object")
  @observable
  private userInfo: IUser = {};

  @persist("object")
  @observable
  private notificationText: string = "";

  private gameService: GameService;

  constructor() {
    this.gameService = new GameService(this.subscribeToNotifications);
    this.initializeStore();
  }

  @computed
  public get user() {
    return this.userInfo;
  }

  @computed
  public get game() {
    return this.gameInfo;
  }

  @computed
  public get newNotification() {
    return !!this.notificationText;
  }

  @computed
  public get notification() {
    return this.notificationText;
  }

  public async ping() {
    try {
      await this.gameService.ping();
      this.gameInfo.isConnected = true;
    } catch (error) {
      this.gameInfo.error = error;
    }
  }

  public async signIn(name: string) {
    try {
      const player = await this.gameService.signIn(name);
      this.setUserInfo(player);
      this.userInfo.isSignedIn = true;
    } catch (error) {
      console.log(this.gameInfo.error);
      this.gameInfo.error = error;
      console.log(this.gameInfo.error);
    }
  }

  private setUserInfo(player: IPlayer) {
    this.userInfo = player;
  }

  public async createGame() {
    if (this.userInfo.id == null) {
      throw new Error("Login first");
    }

    try {
      const gameInfo = await this.gameService.createGame(this.userInfo.id);
      this.gameInfo = gameInfo;
      this.userInfo.gameId = gameInfo.id;
    } catch (error) {
      this.gameInfo.error = error;
    }
  }

  public async joinGame(gameId: string) {
    if (this.userInfo.id == null) {
      throw new Error("Login first");
    }

    try {
      const gameInfo = await this.gameService.joinGame(
        this.userInfo.id,
        gameId
      );
      this.gameInfo = gameInfo;
      this.userInfo.gameId = gameInfo.id;
    } catch (error) {
      this.gameInfo.error = error;
    }
  }

  public async startGame() {
    if (!this.gameInfo.id) {
      throw new Error("Ned to join game first");
    }

    try {
      await this.gameService.startGame(this.gameInfo.id);
    } catch (error) {
      this.gameInfo.error = error;
    }
  }

  public async chooseWord(word: string) {
    if (!this.gameInfo.id) {
      throw new Error("Need to join game first");
    }

    if (this.userInfo.id == null) {
      throw new Error("Login first");
    }

    try {
      await this.gameService.chooseWord(
        this.gameInfo.id,
        this.userInfo.id,
        word
      );
    } catch (error) {
      this.gameInfo.error = error;
    }
  }

  public async chooseSpyMaster() {
    if (!this.gameInfo.id) {
      throw new Error("Need to join game first");
    }

    if (!this.user.id) {
      throw new Error("Need to login first");
    }

    try {
      const spyMasterCards = await this.gameService.chooseSpyMaster(
        this.gameInfo.id,
        this.user.id
      );

      this.gameInfo.cards?.forEach((card, index) => {
        card.type = spyMasterCards[index].type;
      });

      this.user.isSpymMaster = true;
    } catch (error) {
      this.gameInfo.error = error;
    }
  }

  public async leaveGame() {
    if (!this.gameInfo.id) {
      throw new Error("Need to join game first");
    }

    if (!this.user.id) {
      throw new Error("Need to login first");
    }

    try {
      this.gameService.leaveGame(this.gameInfo.id, this.user.id);
      this.initializeStore();
    } catch (error) {
      this.gameInfo.error = error;
    }
  }

  public async replayGame() {
    if (!this.gameInfo.id) {
      throw new Error("Need to join game first");
    }

    if (!this.user.id) {
      throw new Error("Need to login first");
    }

    try {
      this.gameService.replayGame(this.gameInfo.id, this.user.id);
    } catch (error) {
      this.gameInfo.error = error;
    }
  }

  public setNotification(text: string) {
    this.notificationText = text;
  }

  public clearNotifications() {
    this.notificationText = "";
  }

  public clearErrors() {
    this.gameInfo.error = "";
  }

  public clearGameOverReason() {
    this.gameInfo.gameOverReason = "";
  }

  private initializeStore() {
    this.gameInfo = {};
    this.userInfo = {
      ...this.userInfo,
      isSpymMaster: false,
      gameId: undefined,
    };
  }

  private subscribeToNotifications = (
    response: common.SuccessResponse | common.ErrorResponse
  ) => {
    const error = (response as common.ErrorResponse).message;

    if (error) {
      this.gameInfo.error = error;
      return;
    }

    const payload = (response as common.SuccessResponse).payload || {};
    const { action = "", data = {} } = payload as common.GameActionResponse;

    switch (action) {
      // case common.MESSAGES.gameStarted:
      //   this.initializeStore();
      //   this.gameInfo.status = IN_PROGESS;
      //   this.gameInfo.notification = `Game started. Good Luck!`;
      //   break;

      case common.MESSAGES.words:
        this.gameInfo.cards = (data as common.IWords).words.map((word: any) => {
          return { word, chosen: false };
        });
        // TODO: make this into new message
        this.gameInfo.status = GameStatus.InProgress;
        break;

      case common.MESSAGES.playersInfo:
        this.gameInfo.players = (data as common.IPlayers).players;
        break;

      case common.MESSAGES.cardInfo:
        const cardData = data as common.ICard;

        if (this.gameInfo.cards == null) {
          break;
        }

        let index = this.gameInfo.cards?.findIndex(
          (card) => card.word === cardData.word
        );

        this.gameInfo.cards = this.gameInfo.cards.map((card, i) => {
          if (i === index) {
            return { ...cardData, chosen: true };
          }

          return card;
        });

        break;

      case common.MESSAGES.spyMastersInfo:
        this.gameInfo.spyMasters = (data as common.IPlayers).players;
        break;

      case common.MESSAGES.gameNotification:
        this.notificationText = (data as common.IGameNotification).notification;
        break;

      case common.MESSAGES.gameAborted:
        this.initializeStore();
        this.gameInfo.error =
          (data as common.IGameAborted).reason ||
          "Ooops Something went wrong. Sorry for the incovenience";
        break;

      case common.MESSAGES.gameOver:
        this.gameInfo.status = GameStatus.Over;
        this.gameInfo.gameOverReason =
          (data as common.IGameOver).reason || "The game is over !";
        break;

      case common.MESSAGES.newGameCreated:
        const gameId = (data as common.INewGameCreated).gameId;
        this.gameInfo = { id: gameId, status: GameStatus.New };
        this.userInfo = {
          ...this.userInfo,
          isSpymMaster: false,
          gameId: gameId,
        };
        break;

      default:
        console.log(`Default case. Shouldn't hit this. operation: ${action}`);
        break;
    }
  };
}

const store = new Store();
export default store;
