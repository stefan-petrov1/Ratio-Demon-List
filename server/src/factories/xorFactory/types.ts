export type TXor = {
  xor(str: string, key: number): string;
  encrypt(str: string, key: number): string;
  decrypt(str: string, key: number): string;
};
