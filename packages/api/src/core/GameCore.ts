import {
  RESPONSE_CODES,
  GameActionResponse,
  JoinGameRequestPayload,
  ChooseWordRequestPayload,
  ChooseSpyMasterRequestPayload,
  LeaveGameRequestPayload,
} from "@codenames/common";

import { IPlayer } from "./models/IPlayer";
import { successResponse, errorResponse } from "../utils/responses";
import { Payloads } from "./payloads";
import { ICard } from "./models/ICard";
import { Game } from "./Game";
import { Player } from "./Player";
import { IGame } from "./models/IGame";

/**
 * Game :- A main class that manages all the game actions/logics.
 */
export class GameCore {
  /**
   * Initializes a new instance of the class Game.
   * @param ioServer The ioServer instance.
   * @param socket The socket instance.
   * @param gameId The game id.
   */
  constructor(private ioServer: SocketIO.Server) {}

  /**
   * Adds the player to the game pool.
   * @param socket The socket instance
   * @param playerId The player id
   * @param cb The callback after the action is done.
   *
   * Note: Here we need to get the socket instance everytime and can't be stored as intance
   * variable because we are adding the socket to room (game id).
   */
  public onLogin(socket: SocketIO.Socket, playerName: string, cb: Function) {
    try {
      this.checkValidityAndThrowIfInValid(playerName);

      const player: Player = new Player(socket.id, playerName);
      player.save();

      // TODO: what does this even do
      // (socket as any).gameInfo = player;

      cb(null, successResponse(RESPONSE_CODES.loginSuccess, player));
    } catch (error) {
      cb(null, errorResponse(RESPONSE_CODES.loginFailed, error.message));
    }
  }

  public onCreateGame(socket: SocketIO.Socket, playerId: string, cb: Function) {
    try {
      const creator: Player = Player.retrievePlayer(playerId);
      const game = new Game([creator]);
      game.saveGame();

      socket.join(game.gameId);

      cb(null, successResponse(RESPONSE_CODES.success, this.gameInfo(game)));
    } catch (error) {
      cb(null, errorResponse(RESPONSE_CODES.failed, error.message));
    }
  }

  public onJoinGame(
    socket: SocketIO.Socket,
    joinGameRequestPayload: JoinGameRequestPayload,
    cb: Function
  ) {
    try {
      const { gameId, playerId } = joinGameRequestPayload;
      const game: Game = Game.retrieveGame(gameId);
      const player: Player = Player.retrievePlayer(playerId);

      if (game == null) {
        throw new Error("Game ID is not valid");
      }

      if (player == null) {
        throw new Error("Cannot find");
      }

      if (!game.isGameNew()) {
        throw new Error(
          "Cannot Join Game. Please make sure the game exists and has t already started"
        );
      }

      game.addPlayer(player);
      game.saveGame();

      socket.join(gameId);

      cb(null, successResponse(RESPONSE_CODES.success, this.gameInfo(game)));

      this.sendPlayersInfo(gameId, game.gamePlayers);
      this.sendGameNotification(gameId, `${player.name} has joined the game!`);
    } catch (error) {
      cb(null, errorResponse(RESPONSE_CODES.failed, error.message));
    }
  }

  /**
   * Starts the game.
   * @param gameId The game id.
   */
  public onStartGame(gameId: string, cb: Function) {
    try {
      const game = Game.retrieveGame(gameId);

      if (game == null) {
        throw new Error("Could not find game");
      }

      game.startGame();
      game.saveGame();

      this.sendWords(gameId, game.gameWords);
      this.sendGameNotification(gameId, "Game Started");
    } catch (error) {
      cb(null, errorResponse(RESPONSE_CODES.failed, error.message));
    }
  }

  /**
   * The event handles on the card drop of a player.
   * @param req The dropCardRequest.
   */
  public onChooseWord(req: ChooseWordRequestPayload, cb: Function) {
    try {
      const { word, gameId } = req;
      const game = Game.retrieveGame(gameId);

      if (game == null) {
        throw new Error("Game ID is not valid");
      }

      const chosenCard = game.chooseWord(word);
      game.saveGame();

      this.sendCardInfo(gameId, chosenCard);

      if (game.isGameOver()) {
        this.sendGameOver(game.gameId);
      }

      this.sendGameNotification(gameId, `${word} was chosen!`);
    } catch (error) {
      cb(null, errorResponse(RESPONSE_CODES.failed, error.message));
    }
  }

  public onChooseSpymaster(req: ChooseSpyMasterRequestPayload, cb: Function) {
    try {
      const { playerId, gameId } = req;
      const game = Game.retrieveGame(gameId);
      const player = Player.retrievePlayer(playerId);

      if (game == null) {
        throw new Error("Game ID is not valid");
      }

      if (player == null) {
        throw new Error("Cannot find");
      }

      game.addSpyMaster(player);
      game.saveGame();

      this.sendSpyMastersInfo(game.gameId, game.gameSpyMasters);

      cb(
        null,
        successResponse(RESPONSE_CODES.success, game.spyMasterCards(player))
      );

      this.sendGameNotification(gameId, `${player.name} is now a Spy Master!`);
    } catch (error) {
      cb(null, errorResponse(RESPONSE_CODES.failed, error.message));
    }
  }

  public onPlayerLeaveGame(
    socket: SocketIO.Socket,
    req: LeaveGameRequestPayload,
    cb: Function
  ) {
    try {
      const { playerId, gameId } = req;
      const game = Game.retrieveGame(gameId);
      const player = Player.retrievePlayer(playerId);

      if (game == null) {
        throw new Error("Game ID is not valid");
      }

      if (player == null) {
        throw new Error("Cannot find");
      }

      game.removePlayer(player);
      game.saveGame();

      socket.leave(gameId);

      if (game.isGameAborted) {
        this.abortGame(game.gameId);
      }

      this.sendGameNotification(gameId, `${player.name} has left the game :'`);
    } catch (error) {
      cb(null, errorResponse(RESPONSE_CODES.failed, error.message));
    }
  }

  /**
   * Abort the game
   * @param gameId The game id.
   */
  private abortGame(gameId: string) {
    Game.retrieveGame(gameId).deleteGame();

    const payload: GameActionResponse = Payloads.sendGameAborted(
      "The players disconnected from the game. So we aborted the game. Please create or join a new room"
    );

    const response = successResponse(RESPONSE_CODES.gameNotification, payload);
    this.ioServer.to(gameId).emit("data", response);

    // TODO: disconnect all sockets
  }

  /**
   * Sends the message to all players with winner team.
   * @param currentGameIns The game instance
   */
  private sendGameOver(gameId: string) {
    const payload: GameActionResponse = Payloads.sendGameOver();
    const response = successResponse(RESPONSE_CODES.gameNotification, payload);

    this.ioServer.to(gameId).emit("data", response);
  }

  private sendGameNotification(gameId: string, notification: string) {
    const payload: GameActionResponse = Payloads.sendGameNotification(
      notification
    );
    const response = successResponse(RESPONSE_CODES.gameNotification, payload);

    this.ioServer.to(gameId).emit("data", response);
  }

  private sendSpyMastersInfo(gameId: string, spyMasters: IPlayer[]) {
    const payload = Payloads.sendSpyMastersInfo(
      spyMasters.map((player) => player.name)
    );
    const recievePlayersInfo = successResponse(
      RESPONSE_CODES.gameNotification,
      payload
    );
    this.ioServer.to(gameId).emit("data", recievePlayersInfo);
  }

  /**
   * Sends the player info.
   * @param gameId The game id.
   * @param players The players
   */
  private sendPlayersInfo(gameId: string, players: IPlayer[]) {
    const payload = Payloads.sendPlayersInfo(
      players.map((player) => player.name)
    );
    const recievePlayersInfo = successResponse(
      RESPONSE_CODES.gameNotification,
      payload
    );
    this.ioServer.to(gameId).emit("data", recievePlayersInfo);
  }

  /**
   * Sends the cards to the players in the game.
   * @param socketId The game id.
   * @param cards cards array to send
   */
  private sendWords(gameId: string, words: string[]) {
    const payload = Payloads.sendWords(words);
    const recieveWords = successResponse(
      RESPONSE_CODES.gameNotification,
      payload
    );
    this.ioServer.to(gameId).emit("data", recieveWords);
  }

  private sendCardInfo(gameId: string, card: ICard) {
    const payload = Payloads.sendCard(card);
    const recieveCard = successResponse(
      RESPONSE_CODES.gameNotification,
      payload
    );

    this.ioServer.to(gameId).emit("data", recieveCard);
  }

  /**
   * Check's the player id is valid or not.
   * @param playerId The player id
   * @param socketId The socket id
   */
  private checkValidityAndThrowIfInValid(playerName: string) {
    if (!playerName || playerName.length === 0) {
      throw new Error("User name can't be a blank");
    }
  }

  private gameInfo(game: Game) {
    return {
      id: game.gameId,
      players: game.playerNames,
      status: game.status,
    };
  }
}
