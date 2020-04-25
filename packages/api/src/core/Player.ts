import { IPlayer } from "./models/IPlayer";
import { getUniqueId } from "../utils/misc";

import { Database } from "../persistence/database";

interface IPlayerData {
  gameId: string;
  isSpyMaster: boolean;
  socketId: string;
  name: string;
}

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

  static async retrievePlayer(playerId: string): Promise<Player> {
    const playerData = <IPlayerData>(
      await Database.instance.fetchPlayer(playerId)
    );

    let player = new Player(playerData.socketId, playerData.name);
    player.initializeFromData(playerId, playerData);

    return player;
  }

  private initializeFromData(id: string, data: IPlayerData): Player {
    this.id = id;
    this.gameId = data.gameId;
    this.isSpyMaster = data.isSpyMaster;
    this.name = data.name;

    return this;
  }

  /**
   * Saves the game details to the redis store.
   */
  public async save() {
    console.log("saving player");
    Database.instance.savePlayer(this.id, this.dataToSave());
  }

  private dataToSave(): IPlayerData {
    return {
      gameId: this.gameId,
      isSpyMaster: this.isSpyMaster,
      socketId: this.socketId,
      name: this.name,
    };
  }

  public async delete() {
    Database.instance.deletePlayer(this.id);
  }

  public get playerId(): string {
    return this.id;
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
