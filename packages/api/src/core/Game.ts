import { CardType, GameStatus } from "@codenames/common";
import { shuffle, sample, difference } from "underscore";

import { ICard } from "./models/ICard";
import { getUniqueId } from "../utils/misc";
import { IPlayer } from "./models/IPlayer";
import { InMemoryStore } from "../persistence/InMemoryStore";
import { IGame } from "./models/IGame";

import { wordList } from "../constants/word_list";

/**
 * The class which helps to handle each game session.
 */
export class Game implements IGame {
  private id: string;
  private players: IPlayer[];
  private cards: ICard[];
  private chosenCards: ICard[];
  private spyMasters: IPlayer[];

  public status: GameStatus;
  public winnerTeam?: string;
  public gameOverReason: string;

  NUM_CARDS = 25;
  NUM_BLACK_CARDS = 1;
  NUM_CIVILIAN_CARDS = 9;
  MAX_NUM_TEAM_CARDS = 8;

  MAX_NUM_SPYMASTER = 2;

  constructor() {
    this.id = getUniqueId();
    this.players = [];
    this.chosenCards = [];
    this.spyMasters = [];
    this.status = GameStatus.New;
    this.gameOverReason = "";
  }

  static retrieveGame(gameId: string): Game {
    return <Game>InMemoryStore.instance.fetchGame(gameId);
  }

  public startGame(): void {
    this.cards = this.generateGameCards();
    this.status = GameStatus.InProgress;
  }

  public addPlayer(player: IPlayer): void {
    if (this.players.includes(player)) {
      throw new Error("Player is already in the game");
    }

    this.players.push(player);

    player.joinGame(this.id);
  }

  public removePlayer(player: IPlayer): void {
    if (!this.players.includes(player)) {
      throw new Error("Player is not in the game");
    }

    this.players.splice(this.players.indexOf(player), 1);

    const spymasterIndex = this.spyMasters.indexOf(player);
    if (spymasterIndex > -1) {
      this.spyMasters.splice(spymasterIndex, 1);
    }

    if (this.players.length < 2) {
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

  public get gamePlayers(): IPlayer[] {
    return [...this.players];
  }

  public get playerNames(): string[] {
    return this.players.map((player) => player.name);
  }

  public get gameSpyMasters(): IPlayer[] {
    return [...this.spyMasters];
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

    if (this.spyMasters.includes(player)) {
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
    if (!this.players.includes(player)) {
      throw new Error("Player must belong to gabe to be spy master");
    }

    if (this.status !== GameStatus.InProgress) {
      throw new Error("Game is not in progress yet");
    }

    if (this.spyMasters.includes(player)) {
      throw new Error("Already a spy master");
    }

    if (this.spyMasters.length < this.MAX_NUM_SPYMASTER) {
      player.makeSpyMaster();
      this.spyMasters.push(player);
      return;
    }

    throw new Error(
      `Cannot have more than ${this.MAX_NUM_SPYMASTER} spy masters`
    );
  }

  public spyMasterCards(player: IPlayer): ICard[] {
    if (!this.spyMasters.includes(player)) {
      throw new Error("Player is not a spymaster");
    }

    return [...this.cards];
  }

  /**
   * Saves the game details to the redis store.
   */
  public saveGame() {
    this.players.forEach((player) => player.save());
    InMemoryStore.instance.saveGame(this.gameId, this);
  }

  public deleteGame() {
    InMemoryStore.instance.deleteGame(this.gameId);
  }

  private generateGameCards(): ICard[] {
    const words = sample(wordList, this.NUM_CARDS);

    // create cards from words
    const teamCardTypes = [CardType.Blue, CardType.Red];
    const cardTypeWithMore = sample(teamCardTypes);
    const cardTypeWithLess = difference(teamCardTypes, [cardTypeWithMore])[0];

    const cards = words.map((word, index) => {
      let cardType;

      const non_team_cards = this.NUM_CIVILIAN_CARDS + this.NUM_BLACK_CARDS;

      if (index < this.NUM_BLACK_CARDS) {
        cardType = CardType.Assasin;
      } else if (this.NUM_BLACK_CARDS <= index && index < non_team_cards) {
        cardType = CardType.Civilian;
      } else if (
        non_team_cards <= index &&
        index < non_team_cards + this.MAX_NUM_TEAM_CARDS
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
