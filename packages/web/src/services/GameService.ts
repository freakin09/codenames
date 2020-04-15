import {
  // chooseWordPayload,
  // createGamePayload,
  joinGamePayload,
  loginPayload,
  pingPayload,
  ResponseType,
  SuccessResponse,
  createGamePayload,
  startGamePayload,
  chooseWordPayload,
  chooseSpyMasterPayload,
  leaveGamePayload,
} from "@codenames/common";
import * as io from "socket.io-client";

const ifDevelopment = process.env.NODE_ENV === "development";
const connection = ifDevelopment
  ? "http://localhost:4500/"
  : document.location.protocol + "//" + document.location.host;
const ioClient: SocketIOClient.Socket = io.connect(connection, {
  timeout: 200000,
});

class GameService {
  /**
   * Initializes a new instance of the GameService.
   * @param subscribeToNotifications The callback to subscribe notifications
   */
  constructor(
    private subscribeToNotifications: (data: SuccessResponse, cb: any) => void
  ) {
    ioClient.on("data", this.subscribeToNotifications);

    // setInterval(() => {
    //   this.ping().then(() => "");
    // }, 10000);
  }

  /**
   * Sigin to the game.
   * @param name name of the user.
   */
  public signIn(name: string): Promise<any> {
    return this.sendRequest(loginPayload(name));
  }

  /**
   * Sigin to the game.
   * @param name name of the user.
   */
  public createGame(playerId: string): Promise<any> {
    return this.sendRequest(createGamePayload(playerId));
  }

  public joinGame(playerId: string, gameId: string): Promise<any> {
    return this.sendRequest(joinGamePayload(playerId, gameId));
  }

  public startGame(gameId: string): Promise<any> {
    return this.sendRequest(startGamePayload(gameId));
  }

  public chooseWord(gameId: string, word: string): Promise<any> {
    return this.sendRequest(chooseWordPayload(gameId, word));
  }

  public chooseSpyMaster(gameId: string, playerId: string): Promise<any> {
    return this.sendRequest(chooseSpyMasterPayload(gameId, playerId));
  }

  public leaveGame(gameId: string, playerId: string): Promise<any> {
    return this.sendRequest(leaveGamePayload(gameId, playerId));
  }

  /**
   * Checks the connection is alive or not.
   */
  public ping(): Promise<boolean> {
    return this.sendRequest(pingPayload());
  }

  /**
   * Opens the socket connection.
   */
  private openConnection() {
    if (!ioClient.connected) {
      ioClient.connect();
    }
  }

  /**
   * Helper to communicate with the socket server.
   * @param payload The payload needs to send
   */
  private sendRequest(payload: any): Promise<any> {
    this.openConnection();

    return new Promise((resolve, reject) => {
      ioClient.emit("data", payload, (error: any, result: any) => {
        if (error) {
          reject(error);
          return;
        }

        if (result.type === ResponseType.error) {
          reject(result.message);
        }

        resolve(result.payload || true);
      });
    });
  }
}

export default GameService;
