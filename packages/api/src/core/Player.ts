import { IPlayer } from "./models/IPlayer";
import { InMemoryStore } from "../persistence/InMemoryStore";
import { getUniqueId } from "../utils/misc";

/**
 * The class which helps to handle each game session.
 */
export class Player implements IPlayer {
  private id: string;
  public gameId?: string;
  public isSpyMaster: boolean;

  constructor(public socketId: string, public name: string) {
    this.id = getUniqueId();
    this.isSpyMaster = false;
  }

  static retrievePlayer(playerId: string): Player {
    return <Player>InMemoryStore.instance.fetchPlayer(playerId);
  }

  /**
   * Saves the game details to the redis store.
   */
  public save() {
    InMemoryStore.instance.savePlayer(this.id, this);
  }

  public delete() {
    InMemoryStore.instance.deleteGame(this.id);
  }

  public joinGame(gameId: string) {
    this.gameId = gameId;
  }

  public leaveGame() {
    this.gameId = null;
    this.isSpyMaster = false;
  }

  public makeSpyMaster() {
    if (!this.gameId) {
      throw new Error("Player needs to belong to game to be spymaster");
    }

    this.isSpyMaster = true;
  }
}
