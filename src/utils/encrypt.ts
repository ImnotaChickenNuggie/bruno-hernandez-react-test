import CryptoES from "crypto-es";

const secretKey = 'ClaveSecreta';

export const encryptData = (data: any) => {
  return CryptoES.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

export const decryptData = (encryptedData: string) => {
  const bytes = CryptoES.AES.decrypt(encryptedData, secretKey);
  return JSON.parse(bytes.toString(CryptoES.enc.Utf8));
};