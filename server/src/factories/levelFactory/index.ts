import { getPositionByName } from '../../services/demonListService/index';
import { IPositionLevelData } from '../../services/demonListService/types';
import xorFactory from '../xorFactory';
import { TXor } from '../xorFactory/types';
import {
  demonDifficulties,
  difficulties,
  levelLenghts,
  music,
} from './constants';
import {
  ILevel,
  ILevelInfo,
  IParsedDemonListData,
  ISongInput,
  ISongParsed,
} from './types';

/*
################################################ QUICK NOTE ################################################
All the parsing for the level has been copied and refactored from GD Colon's GDbrowser project.
The link to GD Colon's project repo is: https://github.com/GDColon/GDBrowser.
For any business problems or bugs please DM me via Discord at: StefanDP#6411.
################################################ QUICK NOTE ################################################
*/

async function getDemonListData(
  name: string
): Promise<IParsedDemonListData | undefined> {
  const data: IPositionLevelData[] = await getPositionByName(name);

  if (!data.length) return undefined;
  const levelData: IPositionLevelData = data[0];

  return {
    position: levelData.position,
    requirement: levelData.requirement,
    video: levelData.video,
    publisher: levelData.publisher.name,
    verifier: levelData.verifier.name,
  };
}

function parseLevelDifficulty(levelInfo: ILevelInfo) {
  let difficulty = difficulties[levelInfo[9]] || 'Unrated';

  if (Number(levelInfo[17]) > 0) {
    difficulty = (demonDifficulties[levelInfo[43]] || 'Hard') + ' Demon';
  }

  if (Number(levelInfo[25]) > 0) {
    difficulty = 'Auto';
  }

  return difficulty;
}

function parseGameVersion(version: number): string {
  return version > 17
    ? (version / 10).toFixed(1)
    : version === 11
    ? '1.8'
    : version === 10
    ? '1.7'
    : 'Pre-1.7';
}

function parseSong(
  customSong: number,
  officialSong: number,
  songInfo: { [k: string]: string }
): ISongParsed {
  if (customSong) {
    return {
      name: songInfo[2] || 'Unknown',
      author: songInfo[4] || 'Unknown',
      id: Number(songInfo[1]) || customSong,
      link: decodeURIComponent(songInfo[10]),
    };
  } else {
    const foundSong = music[officialSong] || { null: true };

    return {
      name: foundSong[0] || 'Unknown',
      author: foundSong[1] || 'Unknown',
      id: officialSong,
    };
  }
}

function parsePassword(password: string): string {
  if (!password || Number(password) === 0) {
    return password;
  }

  const xor: TXor = xorFactory();
  const parsedPassword: string = xor.decrypt(password, 26364);

  if (parsedPassword.length > 1) return parsedPassword.slice(1);
  return parsedPassword;
}

export default async function levelFactory(
  levelInfo: ILevelInfo,
  songInfo: ISongInput,
  authorArr: Array<string> = []
): Promise<ILevel> {
  const name = (levelInfo[2] || '-').trim();

  const description =
    Buffer.from(levelInfo[3] || '', 'base64').toString() ||
    '(No description provided)';

  const officialSong = Number(levelInfo[35]) ? 0 : parseInt(levelInfo[12]) + 1;
  const customSong = Number(levelInfo[35]) || 0;

  let demonListData: IParsedDemonListData | undefined = await getDemonListData(
    name
  );

  let video = undefined;

  if (demonListData) {
    const { video: videoFromData, ...leftData } = demonListData;
    demonListData = leftData;

    if (videoFromData) {
      video = videoFromData;
    }
  }

  return {
    levelId: Number(levelInfo[1]) || 0,
    name,
    author: authorArr[1] || '-',
    description,
    difficulty: parseLevelDifficulty(levelInfo),
    password: parsePassword(levelInfo[27]) || '-',
    gameVersion: parseGameVersion(Number(levelInfo[13])),
    video: video || '-',
    demonList: demonListData,
    length: levelLenghts[levelInfo[15]] || 'XL',
    objects: Number(levelInfo[45]) || 0,
    song: parseSong(customSong, officialSong, songInfo),
  };
}
