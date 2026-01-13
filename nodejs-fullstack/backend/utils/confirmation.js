const crypto = require('crypto');
require('dotenv').config();
const algorithm = process.env.CRYPTO_ALGORITHM;
const secretKey = process.env.CONFIRMATION_SECRET_KEY;
const iv = process.env.INITIALIZATION_VECTOR;

const encrypt = (token) => {
    const cipher = crypto.createCipheriv(algorithm, secretKey, Buffer.from(iv, "hex"));
    const encrypted = Buffer.concat([cipher.update(token), cipher.final()]);
    return encrypted.toString();
}

const decrypt = (token) => {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, "hex"));
    const decrypted = Buffer.concat([decipher.update(token), decipher.final()]);
    return decrypted.toString();
}

module.exports = {encrypt, decrypt};