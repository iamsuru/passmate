import CryptoJS from "crypto-js";

const SECRET_KEY = String(process.env.REACT_APP_CRYPTO_SECURE_KEY);

export const encrypt = (inputValue: string): string => {
    return CryptoJS.AES.encrypt(inputValue, SECRET_KEY, { mode: CryptoJS.mode.ECB }).toString();
};

export const decrypt = (inputValue: string): string => {
    const bytes = CryptoJS.AES.decrypt(inputValue, SECRET_KEY, { mode: CryptoJS.mode.ECB });
    return bytes.toString(CryptoJS.enc.Utf8);
};
