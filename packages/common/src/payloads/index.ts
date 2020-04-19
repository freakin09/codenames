import { MESSAGES } from "../messages";

export const loginPayload = (name: string) => {
  return { operation: MESSAGES.login, payload: { name } };
};

export const createGamePayload = (playerId: string) => {
  return { operation: MESSAGES.createGame, payload: { playerId } };
};

export const joinGamePayload = (playerId: string, gameId: string) => {
  return { operation: MESSAGES.joinGame, payload: { playerId, gameId } };
};

export const startGamePayload = (gameId: string) => {
  return { operation: MESSAGES.startGame, payload: { gameId } };
};

export const chooseWordPayload = (
  gameId: string,
  playerId: string,
  word: string
) => {
  return {
    operation: MESSAGES.chooseWord,
    payload: { gameId, playerId, word },
  };
};

export const chooseSpyMasterPayload = (gameId: string, playerId: string) => {
  return { operation: MESSAGES.chooseSpyMaster, payload: { gameId, playerId } };
};

export const leaveGamePayload = (gameId: string, playerId: string) => {
  return { operation: MESSAGES.leaveGame, payload: { gameId, playerId } };
};

export const replayGamePayload = (gameId: string, playerId: string) => {
  return { operation: MESSAGES.replayGame, payload: { gameId, playerId } };
};

export const pingPayload = () => {
  return { operation: MESSAGES.ping, payload: { ping: "ping" } };
};
