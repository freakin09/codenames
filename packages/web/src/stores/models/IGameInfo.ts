import { GameStatus } from "@codenames/common";
import { ICard } from "./ICard";

export interface IGame {
  id?: string;
  notification?: string;
  status?: GameStatus;
  error?: string;
  cards?: ICard[];
  players?: string[];
  isConnected?: boolean;
  spyMasters?: string[];
  gameOverReason?: string;
}
