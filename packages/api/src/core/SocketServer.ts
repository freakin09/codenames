import {
  MESSAGES,
  RequestPayload,
  SignInRequestPayload,
  ChooseWordRequestPayload,
  CreateGameRequestPayload,
  JoinGameRequestPayload,
  StartGameRequestPayload,
  ChooseSpyMasterRequestPayload,
  LeaveGameRequestPayload,
} from "@codenames/common";
import { GameCore } from "./GameCore";
import { LoggerService } from "../services/LoggerService";

/**
 * Socket server class.
 */
export class SocketServer {
  /**
   * The instance of the GameCore class.
   */
  private gameCore: GameCore;

  /**
   * The socket server.
   */
  public ioServer: SocketIO.Server;

  /**
   * Initializes a new instance of the class SocketServer.
   * @param ioServer The socket server instance.
   */
  constructor(ioServer: any) {
    this.ioServer = ioServer;
    this.gameCore = new GameCore(this.ioServer);
  }

  /**
   * Listen socket
   */
  public watchConnection() {
    this.ioServer.on("connection", (socket: SocketIO.Socket) => {
      LoggerService.log("Connected", `"Socket connected - ${socket.id}"`);
      this.subscribe(socket);
    });
  }

  /**
   * Subscribes to the socket events.
   * @param socket The socket instance
   */
  private subscribe(socket: SocketIO.Socket) {
    socket.on("data", (data, cb) => this.onDataHandler(socket, data, cb));

    socket.on("error", (error) => this.onErrorHandler(socket, error));

    // socket.on("disconnect", () => this.onDisconnectHandler(socket));
  }

  /**
   * The handler listens to the events emitted by the clients.
   * @param socket The socket instance
   * @param request The data recieved from the client
   * @param cb The callback method.
   */
  private async onDataHandler(
    socket: SocketIO.Socket,
    request: RequestPayload,
    cb: Function
  ) {
    const { payload = {} } = request;

    switch (request.operation) {
      case MESSAGES.ping:
        cb(null, MESSAGES.pong);
        break;

      case MESSAGES.login:
        const name = (payload as SignInRequestPayload).name;
        await this.gameCore.onLogin(socket, name, cb);
        break;

      case MESSAGES.joinGame:
        const joinGameRequest = payload as JoinGameRequestPayload;
        await this.gameCore.onJoinGame(socket, joinGameRequest, cb);
        break;

      case MESSAGES.createGame:
        const playerId = (payload as CreateGameRequestPayload).playerId;
        await this.gameCore.onCreateGame(socket, playerId, cb);
        break;

      case MESSAGES.startGame:
        const gameId = (payload as StartGameRequestPayload).gameId;
        await this.gameCore.onStartGame(gameId, cb);
        break;

      case MESSAGES.chooseWord:
        const chooseWordRequest = payload as ChooseWordRequestPayload;
        this.gameCore.onChooseWord(chooseWordRequest, cb);
        break;

      case MESSAGES.chooseSpyMaster:
        const chooseSpyMasterRequest = payload as ChooseSpyMasterRequestPayload;
        await this.gameCore.onChooseSpymaster(chooseSpyMasterRequest, cb);
        break;

      case MESSAGES.leaveGame:
        const leaveGameRequest = payload as LeaveGameRequestPayload;
        await this.gameCore.onPlayerLeaveGame(socket, leaveGameRequest, cb);
        break;

      default:
        break;
    }
  }

  /**
   * Error handler
   * @param socket The socket instance
   * @param error The error message
   */
  private onErrorHandler(socket: SocketIO.Socket, error: any) {
    LoggerService.logError("Error in socket", error);
  }

  /**
   * The handler gets called on socket disconnect.
   * Can be used to close or clean gracefully when required.
   * @param socket The socket instance.
   */
  // private onDisconnectHandler(socket: SocketIO.Socket) {
  //   LoggerService.log("Disconnected", "Socket disconnected");

  //   const { gameInfo } = socket as any;

  //   if (gameInfo) {
  //     this.gameCore.abortGame((socket as any).gameInfo.gameId);
  //   }
  // }
}
