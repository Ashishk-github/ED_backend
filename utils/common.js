const crypto = require("crypto");

const algorithm = "aes-256-cbc"; // the encryption algorithm to use
const key = process.var.app.app_key; // the encryption key

module.exports.encrypt = encrypt = (text) => {
  const iv = crypto.randomBytes(16); // generate a random initialization vector
  console.log(key.length, text);
  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(key.slice(0, 32)),
    iv
  );
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

module.exports.decrypt = decrypt = (text) => {
  const parts = text.split(":");
  const iv = Buffer.from(parts.shift(), "hex");
  const encryptedText = Buffer.from(parts.join(":"), "hex");
  console.log(encryptedText);
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(key.slice(0, 32)),
    iv
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};
