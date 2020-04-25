import { IPlayer } from "./IPlayer";
import { ICard } from "./ICard";

/**
 * The main Game model object.
 */
export interface IGame {
  gameId: string;
  gameWords: string[];
  gamePlayers: Promise<IPlayer[]>;
  gameSpyMasters: Promise<IPlayer[]>;
  winnerTeam?: string;
  gameOverReason: string;

  addPlayer(player: IPlayer): void;

  startGame(): void;

  isGameNew(): boolean;
  isGameOver(): boolean;

  chooseWord(player: IPlayer, word: string): ICard;
  addSpyMaster(player: IPlayer): void;
}
