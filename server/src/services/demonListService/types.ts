export interface ILevelPlayer {
  id: number;
  name: string;
  banned: boolean;
}

export interface IPositionLevelData {
  id: number;
  position: number;
  name: string;
  requirement: number;
  video: string;
  publisher: ILevelPlayer;
  verifier: ILevelPlayer;
  level_id: number;
}
