/**
 * The model for all the data send for various actions to the clients.
 */
export interface RequestPayload {
  operation: string;
  payload: any;
}
