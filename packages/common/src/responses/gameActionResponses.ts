import { CardType } from "../constants/index";
/**
 * Model for all game action response.
 */
export interface GameActionResponse {
  action: string;
  data: object;
}

/**
 * Card response model.
 */
export interface IWords {
  words: string[];
}

export interface ICard {
  word: string;
  type: CardType;
}

/**
 * Game over response model.
 */
export interface IGameOver {
  winnerId: string;
}

/**
 * Abort game model.
 */
export interface IGameAborted {
  reason: string;
}

export interface IGameNotification {
  notification: string;
}

/**
 * Players response model.
 */
export interface IPlayers {
  players: string[];
}
