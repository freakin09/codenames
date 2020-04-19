import * as common from "@codenames/common";
import { ICard } from "./models/ICard";

export class Payloads {
  /**
   * Forms the response that needs to be send for 'recieveCards' action.
   * @param cards The cards array needs to send
   */
  public static sendWords(words: string[]): common.GameActionResponse {
    const data: common.IWords = {
      words,
    };
    return {
      action: common.MESSAGES.words,
      data,
    };
  }

  /**
   * Forms reponse to notify the turn.
   */
  public static sendCard(card: ICard): common.GameActionResponse {
    const data: common.ICard = {
      ...card,
    };

    return {
      action: common.MESSAGES.cardInfo,
      data,
    };
  }

  /**
   * Forms reponse to notify the game has over.
   * @param winnerId The winner id.
   */
  public static sendGameOver(reason: string): common.GameActionResponse {
    const data: common.IGameOver = {
      reason,
    };

    return {
      action: common.MESSAGES.gameOver,
      data,
    };
  }

  public static sendGameNotification(text: string): common.GameActionResponse {
    const data: common.IGameNotification = {
      notification: text,
    };

    return {
      action: common.MESSAGES.gameNotification,
      data,
    };
  }

  /**
   * Forms reponse to notify the game is aborted.
   * @param reason The reason to abort the game.
   */
  public static sendGameAborted(reason: string): common.GameActionResponse {
    const data: common.IGameAborted = {
      reason,
    };
    return {
      action: common.MESSAGES.gameAborted,
      data,
    };
  }

  /**
   * Forms reponse to notify new game is created
   * @param reason The reason to abort the game.
   */
  public static sendNewGameCreated(gameId: string): common.GameActionResponse {
    const data: common.INewGameCreated = {
      gameId,
    };
    return {
      action: common.MESSAGES.newGameCreated,
      data,
    };
  }

  /**
   * Forms reponse to notify the players information.
   * @param players The player id's
   */
  public static sendPlayersInfo(players: string[]): common.GameActionResponse {
    const data: common.IPlayers = {
      players,
    };
    return {
      action: common.MESSAGES.playersInfo,
      data,
    };
  }

  /**
   * Forms reponse to notify the players information.
   * @param players The player id's
   */
  public static sendSpyMastersInfo(
    players: string[]
  ): common.GameActionResponse {
    const data: common.IPlayers = {
      players,
    };
    return {
      action: common.MESSAGES.spyMastersInfo,
      data,
    };
  }
}
