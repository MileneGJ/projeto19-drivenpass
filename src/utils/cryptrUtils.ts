import Cryptr from "cryptr";

function encryptString(password: string): string {
    const cryptrKey = process.env.CRYPTR_KEY as string || 'secret'
    const cryptr = new Cryptr(cryptrKey);
    return cryptr.encrypt(password)
}

function decryptString(password: string): string {
    const cryptrKey = process.env.CRYPTR_KEY as string || 'secret'
    const cryptr = new Cryptr(cryptrKey);
    return cryptr.decrypt(password)
}

export default {
    encryptString,
    decryptString
}