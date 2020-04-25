import { CardType, GameStatus } from "@codenames/common";
import { shuffle, sample, difference } from "underscore";

import { ICard } from "./models/ICard";
import { getUniqueId } from "../utils/misc";
import { IPlayer } from "./models/IPlayer";
import { IGame } from "./models/IGame";

import { wordList } from "../constants/word_list";

import { Player } from "./Player";

import { Database } from "../persistence/database";

interface IGameData {
  playerIds: string[];
  cards: ICard[];
  chosenCards: ICard[];
  spyMasterIds: string[];
  status: GameStatus;
  winnerTeam?: string;
  gameOverReason: string;
}

/**
 * The class which helps to handle each game session.
 */
export class Game implements IGame {
  private id: string;
  private playerIds: string[];
  private cards: ICard[];
  private chosenCards: ICard[];
  private spyMasterIds: string[];

  public status: GameStatus;
  public winnerTeam?: string;
  public gameOverReason: string;

  static NUM_CARDS = 25;
  static NUM_BLACK_CARDS = 1;
  static NUM_CIVILIAN_CARDS = 9;
  static MAX_NUM_TEAM_CARDS = 8;

  static MAX_NUM_SPYMASTER = 2;

  constructor() {
    this.id = getUniqueId();
    this.playerIds = [];
    this.cards = [];
    this.chosenCards = [];
    this.spyMasterIds = [];
    this.status = GameStatus.New;
    this.gameOverReason = "";
  }

  static async retrieveGame(gameId: string): Promise<Game> {
    const gameData = <IGameData>(
      (<unknown>await Database.instance.fetchGame(gameId))
    );

    let game = new Game();
    game.initializeFromData(gameId, gameData);

    return game;
  }

  public async saveGame() {
    Database.instance.saveGame(this.gameId, this.dataToSave());
  }

  public async deleteGame() {
    Database.instance.deleteGame(this.gameId);
  }

  private initializeFromData(id: string, gameData: IGameData): Game {
    this.id = id;
    this.playerIds = gameData.playerIds;
    this.cards = gameData.cards;
    this.chosenCards = gameData.chosenCards;
    this.spyMasterIds = gameData.spyMasterIds;
    this.status = gameData.status;
    this.gameOverReason = gameData.gameOverReason;
    this.winnerTeam = gameData.winnerTeam;

    return this;
  }

  private dataToSave(): IGameData {
    return {
      playerIds: [...this.playerIds],
      cards: [...this.cards],
      chosenCards: [...this.cards],
      spyMasterIds: [...this.spyMasterIds],
      status: this.status,
      winnerTeam: this.winnerTeam,
      gameOverReason: this.gameOverReason,
    };
  }

  public startGame(): void {
    this.cards = this.generateGameCards();
    this.status = GameStatus.InProgress;
  }

  public addPlayer(player: IPlayer): void {
    if (this.playerIds.includes(player.playerId)) {
      throw new Error("Player is already in the game");
    }

    this.playerIds.push(player.playerId);

    player.joinGame(this.id);
  }

  public removePlayer(player: IPlayer): void {
    if (!this.playerIds.includes(player.playerId)) {
      throw new Error("Player is not in the game");
    }

    this.playerIds.splice(this.playerIds.indexOf(player.playerId), 1);

    const spymasterIndex = this.spyMasterIds.indexOf(player.playerId);
    if (spymasterIndex > -1) {
      this.spyMasterIds.splice(spymasterIndex, 1);
    }

    if (this.playerIds.length < 2) {
      this.status = GameStatus.Aborted;
    }

    player.leaveGame();
  }

  /**
   * Gets the games words.
   */
  public get gameWords(): string[] {
    return this.cards.map((wordInfo) => wordInfo.word);
  }

  public get gameId(): string {
    return this.id;
  }

  public get gamePlayers(): Promise<IPlayer[]> {
    const playersPromises = this.playerIds.map((id) => {
      return Player.retrievePlayer(id);
    });

    return Promise.all(playersPromises);
  }

  public get gameSpyMasters(): Promise<IPlayer[]> {
    const playerPromises = this.spyMasterIds.map((id) => {
      return Player.retrievePlayer(id);
    });

    return Promise.all(playerPromises);
  }

  public isGameNew(): boolean {
    return this.status === GameStatus.New;
  }

  public isGameOver(): boolean {
    return this.status === GameStatus.Over;
  }

  public isGameAborted(): boolean {
    return this.status === GameStatus.Aborted;
  }

  /**
   * Updates the strike by updating the turn, adding the drop details.
   */
  public chooseWord(player: IPlayer, word: string): ICard {
    const chosenCard = this.cards.find((wordInfo) => wordInfo.word === word);

    if (!chosenCard || this.chosenCards.includes(chosenCard)) {
      throw new Error("Cannot choose this word");
    }

    if (this.spyMasterIds.includes(player.playerId)) {
      throw new Error("Spy master cannot choose card");
    }

    this.chosenCards.push(chosenCard);

    const blueTeamCards = this.cards.filter(
      (card) => card.type === CardType.Blue
    );
    const redTeamCards = this.cards.filter(
      (card) => card.type === CardType.Red
    );

    // check if game is over
    if (chosenCard.type === CardType.Assasin) {
      this.status = GameStatus.Over;
      this.gameOverReason = `${player.name} chose the assasin card!`;
    } else if (
      chosenCard.type === CardType.Blue &&
      difference(blueTeamCards, this.chosenCards).length === 0
    ) {
      this.winnerTeam = "Blue";
      this.status = GameStatus.Over;
      this.gameOverReason = `Blue Team Won!`;
    } else if (
      chosenCard.type === CardType.Red &&
      difference(redTeamCards, this.chosenCards).length === 0
    ) {
      this.winnerTeam = "Red";
      this.status = GameStatus.Over;
      this.gameOverReason = `Red Team Won!`;
    }

    return chosenCard;
  }

  public addSpyMaster(player: IPlayer) {
    if (!this.playerIds.includes(player.playerId)) {
      throw new Error("Player must belong to game to be spy master");
    }

    if (this.status !== GameStatus.InProgress) {
      throw new Error("Game is not in progress yet");
    }

    if (this.spyMasterIds.includes(player.playerId)) {
      throw new Error("Already a spy master");
    }

    if (this.spyMasterIds.length < Game.MAX_NUM_SPYMASTER) {
      player.makeSpyMaster();
      this.spyMasterIds.push(player.playerId);
      return;
    }

    throw new Error(
      `Cannot have more than ${Game.MAX_NUM_SPYMASTER} spy masters`
    );
  }

  public spyMasterCards(player: IPlayer): ICard[] {
    if (!this.spyMasterIds.includes(player.playerId)) {
      throw new Error("Player is not a spymaster");
    }

    return [...this.cards];
  }

  private generateGameCards(): ICard[] {
    const words = sample(wordList, Game.NUM_CARDS);

    // create cards from words
    const teamCardTypes = [CardType.Blue, CardType.Red];
    const cardTypeWithMore = sample(teamCardTypes);
    const cardTypeWithLess = difference(teamCardTypes, [cardTypeWithMore])[0];

    const cards = words.map((word, index) => {
      let cardType;

      const non_team_cards = Game.NUM_CIVILIAN_CARDS + Game.NUM_BLACK_CARDS;

      if (index < Game.NUM_BLACK_CARDS) {
        cardType = CardType.Assasin;
      } else if (Game.NUM_BLACK_CARDS <= index && index < non_team_cards) {
        cardType = CardType.Civilian;
      } else if (
        non_team_cards <= index &&
        index < non_team_cards + Game.MAX_NUM_TEAM_CARDS
      ) {
        cardType = cardTypeWithMore;
      } else {
        cardType = cardTypeWithLess;
      }

      return {
        word: word,
        type: cardType,
      };
    });

    return shuffle(cards);
  }
}
