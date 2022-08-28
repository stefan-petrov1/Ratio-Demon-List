export interface ISongInput {
  [key: string]: string;
}

export interface ISongParsed {
  name: string;
  author: string;
  id: number;
  link?: string;
}

export interface ILevelInfo {
  [k: string]: string;
}

export interface ILevel {
  levelId: number;
  name: string;
  description: string;
  author: string;
  difficulty: string;
  length: string;
  gameVersion: string;
  password: string;
  objects: number;
  song: ISongParsed;
  video?: string;
  demonList?: IParsedDemonListData;
  position?: number | string;
}

export interface IParsedDemonListData {
  position: number;
  requirement: number;
  publisher: string;
  verifier: string;
  video?: string;
}
