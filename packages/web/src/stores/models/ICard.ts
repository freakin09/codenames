import { CardType } from "@codenames/common";

export interface ICard {
  word: string;
  type?: CardType;
  chosen: boolean;
}
