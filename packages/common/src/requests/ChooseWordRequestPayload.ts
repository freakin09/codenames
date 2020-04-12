import { BasePayload } from "./BasePayload";

export interface ChooseWordRequestPayload extends BasePayload {
  word: string;
}
