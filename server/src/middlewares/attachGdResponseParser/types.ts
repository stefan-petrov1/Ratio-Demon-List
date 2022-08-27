export interface IParsedGdResponse {
  [key: string]: string;
}

export type TGdResponseParser = {
  (body: string, splitter: string): IParsedGdResponse;
};
