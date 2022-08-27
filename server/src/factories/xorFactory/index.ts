import { TXor } from './types';

/*
################################################ QUICK NOTE ################################################
All the parsing for the XOR has been copied and refactored from GD Colon's GDbrowser project.
The link to GD Colon's project repo is: https://github.com/GDColon/GDBrowser.
For any business problems or bugs please DM me via Discord at: StefanDP#6411.
################################################ QUICK NOTE ################################################
*/

export default function xorFactory(): TXor {
  return {
    xor(str: string, key: number) {
      return String.fromCodePoint(
        ...str
          .split('')
          .map(
            (char, i) =>
              char.charCodeAt(0) ^
              key.toString().charCodeAt(i % key.toString().length)
          )
      );
    },
    encrypt(str: string, key: number = 37526) {
      return Buffer.from(this.xor(str, key))
        .toString('base64')
        .replace(/./gs, (c) => ({ '/': '_', '+': '-' }[c] || c));
    },
    decrypt(str: string, key: number = 37526) {
      return this.xor(
        Buffer.from(
          str.replace(/./gs, (c) => ({ '/': '_', '+': '-' }[c] || c)),
          'base64'
        ).toString(),
        key
      );
    },
  };
}
