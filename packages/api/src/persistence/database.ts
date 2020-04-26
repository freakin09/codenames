import { IGame } from "../core/models/IGame";
import { IPlayer } from "../core/models/IPlayer";

import { MongoClient, Db } from "mongodb";

/**
 * Class helps to store the game session in db.
 */
export class Database {
  /**
   * The instance of the class Database.
   */
  private static ins: Database = new Database();

  private dbUrl: string = process.env.MONGODB_URI || "mongodb://localhost/";
  private dbName: string = process.env.DATABASE_NAME || "codenames";
  private mongoClient: MongoClient;
  private db: Db;

  GAME_COLLECTION = "games";
  PLAYER_COLLECTION = "players";

  constructor() {
    Database.ins = this;

    MongoClient.connect(this.dbUrl, (err, client) => {
      if (err) {
        console.error(err);
        throw err;
      }

      this.mongoClient = client;
      this.db = client.db(this.dbName);
    });
  }

  /**
   * Gets the static singleton instance of the database.
   */
  public static get instance(): Database {
    return Database.ins;
  }

  /**
   * Saves the game to the database.
   * @param gameId The game id.
   * @param gameData The game data.
   */
  public saveGame(gameId: string, gameData) {
    const collection = this.db.collection(this.GAME_COLLECTION);
    const document = { _id: gameId, ...gameData };

    collection.updateOne(
      { _id: gameId },
      { $set: document },
      { upsert: true },
      (err, res) => {
        if (err) {
          console.error(err);
          throw err;
        }
      }
    );
  }

  /**
   * Saves the player to the database.
   * @param playerId The player id.
   * @param playerData The player data.
   */
  public savePlayer(playerId: string, playerData) {
    const collection = this.db.collection(this.PLAYER_COLLECTION);
    const document = { _id: playerId, ...playerData };

    collection.updateOne(
      { _id: playerId },
      { $set: document },
      { upsert: true },
      (err, res) => {
        if (err) {
          console.error(err);
          throw err;
        }
      }
    );
  }

  /**
   * Fetches the game by game id.
   * @param gameId The game id.
   */
  public async fetchGame(gameId: string): Promise<IGame> {
    const game = await this.db
      .collection(this.GAME_COLLECTION)
      .findOne({ _id: gameId });

    if (!game) {
      throw new Error("Cannot find Game");
    }

    return game;
  }

  public async fetchPlayer(playerId: string): Promise<IPlayer> {
    const player = await this.db
      .collection(this.PLAYER_COLLECTION)
      .findOne({ _id: playerId });

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
    this.db
      .collection(this.GAME_COLLECTION)
      .deleteOne({ _id: gameId }, (err, res) => {
        if (err) {
          console.error(err);
          throw err;
        }
      });
  }

  /**
   * Deletes the player from the store.
   * @param gameId The player id.
   */
  public deletePlayer(playerId: string) {
    this.db
      .collection(this.PLAYER_COLLECTION)
      .deleteOne({ _id: playerId }, (err, res) => {
        if (err) {
          console.error(err);
          throw err;
        }
      });
  }
}
