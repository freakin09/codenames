import {
  RESPONSE_CODES,
  GameActionResponse,
  JoinGameRequestPayload,
  ChooseWordRequestPayload,
  ChooseSpyMasterRequestPayload,
  LeaveGameRequestPayload,
  ReplayGameRequestPayload,
} from "@codenames/common";

import { IPlayer } from "./models/IPlayer";
import { successResponse, errorResponse } from "../utils/responses";
import { Payloads } from "./payloads";
import { ICard } from "./models/ICard";
import { Game } from "./Game";
import { Player } from "./Player";

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
  public async onLogin(
    socket: SocketIO.Socket,
    playerName: string,
    cb: Function
  ) {
    try {
      this.checkValidityAndThrowIfInValid(playerName);

      const player: Player = new Player(socket.id, playerName);
      await player.save();

      cb(null, successResponse(RESPONSE_CODES.loginSuccess, player));
    } catch (error) {
      cb(null, errorResponse(RESPONSE_CODES.loginFailed, error.message));
    }
  }

  public async onCreateGame(
    socket: SocketIO.Socket,
    playerId: string,
    cb: Function
  ) {
    try {
      const creator: Player = await Player.retrievePlayer(playerId);
      const game: Game = new Game();

      game.addPlayer(creator);
      await game.saveGame();
      await creator.save();

      socket.join(game.gameId);

      cb(
        null,
        successResponse(RESPONSE_CODES.success, await this.gameInfo(game))
      );
    } catch (error) {
      cb(null, errorResponse(RESPONSE_CODES.failed, error.message));
    }
  }

  public async onJoinGame(
    socket: SocketIO.Socket,
    joinGameRequestPayload: JoinGameRequestPayload,
    cb: Function
  ) {
    try {
      const { gameId, playerId } = joinGameRequestPayload;
      const game: Game = await Game.retrieveGame(gameId);
      const player: Player = await Player.retrievePlayer(playerId);

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

      await game.saveGame();
      await player.save();

      socket.join(gameId);

      cb(
        null,
        successResponse(RESPONSE_CODES.success, await this.gameInfo(game))
      );

      this.sendPlayersInfo(gameId, await game.gamePlayers);
      this.sendGameNotification(gameId, `${player.name} has joined the game!`);
    } catch (error) {
      cb(null, errorResponse(RESPONSE_CODES.failed, error.message));
    }
  }

  /**
   * Starts the game.
   * @param gameId The game id.
   */
  public async onStartGame(gameId: string, cb: Function) {
    try {
      const game: Game = await Game.retrieveGame(gameId);

      if (game == null) {
        throw new Error("Could not find game");
      }

      game.startGame();
      await game.saveGame();

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
  public async onChooseWord(req: ChooseWordRequestPayload, cb: Function) {
    try {
      const { word, gameId, playerId } = req;

      const game: Game = await Game.retrieveGame(gameId);
      const player: Player = await Player.retrievePlayer(playerId);

      if (game == null) {
        throw new Error("Game ID is not valid");
      }

      const isGameAlreadyOver = game.isGameOver();

      const chosenCard = game.chooseWord(player, word);
      await game.saveGame();

      this.sendCardInfo(gameId, chosenCard);

      // choosing the word ended the game
      if (!isGameAlreadyOver && game.isGameOver()) {
        this.sendGameOver(game.gameId, game.gameOverReason);
      }

      this.sendGameNotification(gameId, `${player.name} chose ${word} !`);
    } catch (error) {
      cb(null, errorResponse(RESPONSE_CODES.failed, error.message));
    }
  }

  public async onChooseSpymaster(
    req: ChooseSpyMasterRequestPayload,
    cb: Function
  ) {
    try {
      const { playerId, gameId } = req;
      const game: Game = await Game.retrieveGame(gameId);
      const player: Player = await Player.retrievePlayer(playerId);

      if (game == null) {
        throw new Error("Game ID is not valid");
      }

      if (player == null) {
        throw new Error("Cannot find");
      }

      game.addSpyMaster(player);
      await game.saveGame();
      await player.save();

      this.sendSpyMastersInfo(game.gameId, await game.gameSpyMasters);

      cb(
        null,
        successResponse(RESPONSE_CODES.success, game.spyMasterCards(player))
      );

      this.sendGameNotification(gameId, `${player.name} is now a Spy Master!`);
    } catch (error) {
      cb(null, errorResponse(RESPONSE_CODES.failed, error.message));
    }
  }

  public async onReplayGame(req: ReplayGameRequestPayload, cb: Function) {
    try {
      const existingGame: Game = await Game.retrieveGame(req.gameId);
      const newGame: Game = new Game();

      const existingPlayers = await existingGame.gamePlayers;
      existingPlayers.forEach((player) => {
        newGame.addPlayer(player);
        const socket = this.ioServer.sockets.connected[player.socketId];

        socket.leave(existingGame.gameId);
        socket.join(newGame.gameId);
      });

      await newGame.saveGame();
      await existingPlayers.forEach(async (player) => await player.save());

      await existingGame.deleteGame();

      this.sendNewGameCreated(newGame.gameId);

      this.sendPlayersInfo(newGame.gameId, await newGame.gamePlayers);
      this.sendGameNotification(newGame.gameId, `New Game Created!`);
    } catch (error) {
      cb(null, errorResponse(RESPONSE_CODES.failed, error.message));
    }
  }

  public async onPlayerLeaveGame(
    socket: SocketIO.Socket,
    req: LeaveGameRequestPayload,
    cb: Function
  ) {
    try {
      const { playerId, gameId } = req;
      const game: Game = await Game.retrieveGame(gameId);
      const player: Player = await Player.retrievePlayer(playerId);

      if (game == null) {
        throw new Error("Game ID is not valid");
      }

      if (player == null) {
        throw new Error("Cannot find");
      }

      game.removePlayer(player);
      await game.saveGame();
      await player.save();

      socket.leave(gameId);

      if (game.isGameAborted) {
        await this.abortGame(game);
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
  private async abortGame(game: Game) {
    await game.deleteGame();

    const payload: GameActionResponse = Payloads.sendGameAborted(
      "The players disconnected from the game. So we aborted the game. Please create or join a new room"
    );

    //TODO: update each remaining players game id

    const response = successResponse(RESPONSE_CODES.gameNotification, payload);
    this.ioServer.to(game.gameId).emit("data", response);

    // TODO: disconnect all sockets
  }

  /**
   * Sends the message to all players with winner team.
   * @param currentGameIns The game instance
   */
  private sendGameOver(gameId: string, gameOverReason: string) {
    const payload: GameActionResponse = Payloads.sendGameOver(gameOverReason);
    const response = successResponse(RESPONSE_CODES.gameNotification, payload);

    this.ioServer.to(gameId).emit("data", response);
  }

  private sendNewGameCreated(gameId: string) {
    const payload: GameActionResponse = Payloads.sendNewGameCreated(gameId);
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

  private async gameInfo(game: Game) {
    const players = await game.gamePlayers;
    const playerNames = players.map((player) => {
      return player.name;
    });
    return {
      id: game.gameId,
      players: playerNames,
      status: game.status,
    };
  }
}
