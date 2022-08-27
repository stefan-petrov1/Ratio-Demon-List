import xorFactory from '../xorFactory';
import { TXor } from '../xorFactory/types';
import {
  demonDifficulties,
  difficulties,
  levelLenghts,
  music,
} from './constants';
import { ILevel, ILevelInfo, ISongInput, ISongParsed } from './types';

/*
################################################ QUICK NOTE ################################################
All the parsing for the level has been copied and refactored from GD Colon's GDbrowser project.
The link to GD Colon's project repo is: https://github.com/GDColon/GDBrowser.
For any business problems or bugs please DM me via Discord at: StefanDP#6411.
################################################ QUICK NOTE ################################################
*/

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
      songName: songInfo[2] || 'Unknown',
      songAuthor: songInfo[4] || 'Unknown',
      songID: Number(songInfo[1]) || customSong,
      songLink: decodeURIComponent(songInfo[10]),
    };
  } else {
    const foundSong = music[officialSong] || { null: true };

    return {
      songName: foundSong[0] || 'Unknown',
      songAuthor: foundSong[1] || 'Unknown',
      songID: officialSong,
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

export default function levelFactory(
  levelInfo: ILevelInfo,
  songInfo: ISongInput,
  authorArr: Array<string> = []
): ILevel {
  const description =
    Buffer.from(levelInfo[3] || '', 'base64').toString() ||
    '(No description provided)';

  const officialSong = Number(levelInfo[35]) ? 0 : parseInt(levelInfo[12]) + 1;
  const customSong = Number(levelInfo[35]) || 0;

  return {
    id: Number(levelInfo[1]) || 0,
    name: levelInfo[2] || '-',
    author: authorArr[1] || '-',
    description,
    difficulty: parseLevelDifficulty(levelInfo),
    password: parsePassword(levelInfo[27]),
    gameVersion: parseGameVersion(Number(levelInfo[13])),
    length: levelLenghts[levelInfo[15]] || 'XL',
    objects: Number(levelInfo[45]) || 0,
    song: parseSong(customSong, officialSong, songInfo),
  };
}
