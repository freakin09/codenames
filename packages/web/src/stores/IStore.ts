import { IGame } from "./models/IGameInfo";
import { IUser } from "./models/IUserInfo";

export interface IStore {
  game: IGame;
  user: IUser;
  notification?: string;
  newNotification: boolean;

  ping(): Promise<void>;
  signIn(name: string): Promise<any>;

  chooseWord(word: string): Promise<any>;
  chooseSpyMaster(): Promise<any>;
  clearNotifications(): void;

  setNotification(text: string): void;

  createGame(): Promise<any>;
  joinGame(gameId: string): Promise<any>;
  startGame(): Promise<any>;
  leaveGame(): Promise<any>;

  leaveGame(): void;

  clearErrors(): void;
}
