import { IGame } from "../core/models/IGame";
import { IPlayer } from "../core/models/IPlayer";

/**
 * Class helps to store the game session in memory.
 */
export class InMemoryStore {
  /**
   * The instance of the class InMemoryStore.
   */
  private static ins: InMemoryStore = new InMemoryStore();

  /**
   * The store object in which tje whole game data will be stored.
   */
  private store: { ["gameId"]: IGame; ["playerId"]: IPlayer };

  constructor() {
    InMemoryStore.ins = this;
    (this.store as any) = {};
  }

  /**
   * Gets the static singleton instance of the store.
   */
  public static get instance(): InMemoryStore {
    return InMemoryStore.ins;
  }

  /**
   * Saves the game to the memory.
   * @param gameId The game id.
   * @param game The game data.
   */
  public saveGame(gameId: string, game: IGame) {
    this.store[gameId] = game;
  }

  /**
   * Saves the player to the memory.
   * @param playerId The player id.
   * @param Player The player data.
   */
  public savePlayer(playerId: string, player: IPlayer) {
    this.store[playerId] = player;
  }

  /**
   * Fetches the game by game id.
   * @param gameId The game id.
   */
  public fetchGame(gameId: string): IGame {
    const game = this.store[gameId];

    if (!game) {
      throw new Error("Cannot find Game");
    }

    return game;
  }

  public fetchPlayer(playerId: string): IPlayer {
    const player = this.store[playerId];

    if (!player) {
      throw new Error("Cannot find player");
    }

    return player;
  }

  /**
   * Deletes the game from the store.
   * @param gameId The game id.
   */
  public deleteGame(gameId: string) {
    delete this.store[gameId];
  }

  /**
   * Gets the number if games sessions stored in the store.
   */
  public get count(): number {
    return Object.keys(this.store).length;
  }
}
