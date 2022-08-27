export interface ISongInput {
  [key: string]: string;
}

export interface ISongParsed {
  songName: string;
  songAuthor: string;
  songID: number;
  songLink?: string;
}

export interface ILevelInfo {
  [k: string]: string;
}

export interface ILevel {
  id: number;
  name: string;
  description: string;
  author: string;
  difficulty: string;
  length: string;
  gameVersion: string;
  password: string;
  objects: number;
  song: ISongParsed;
}
