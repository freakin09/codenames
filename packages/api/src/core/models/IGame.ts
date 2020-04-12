import { IPlayer } from "./IPlayer";
import { ICard } from "./ICard";

/**
 * The main Game model object.
 */
export interface IGame {
  gameId: string;
  gameWords: string[];
  gamePlayers: IPlayer[];
  winnerTeam?: string;

  addPlayer(player: IPlayer): void;

  startGame(): void;

  isGameNew(): boolean;
  isGameOver(): boolean;

  chooseWord(word: string): ICard;
  addSpyMaster(player: IPlayer): void;
}
