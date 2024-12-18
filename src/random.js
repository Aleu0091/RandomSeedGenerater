const crypto = require("crypto");

const algorithms = [
    "blake2b512",
    "blake2s256",
    "id-rsassa-pkcs1-v1_5-with-sha3-224",
    "id-rsassa-pkcs1-v1_5-with-sha3-256",
    "id-rsassa-pkcs1-v1_5-with-sha3-384",
    "id-rsassa-pkcs1-v1_5-with-sha3-512",
    "md5",
    "md5-sha1",
    "md5WithRSAEncryption",
    "ripemd",
    "ripemd160",
    "ripemd160WithRSA",
    "rmd160",
    "sha1",
    "sha1WithRSAEncryption",
    "sha224",
    "sha224WithRSAEncryption",
    "sha256",
    "sha256WithRSAEncryption",
    "sha3-224",
    "sha3-256",
    "sha3-384",
    "sha3-512",
    "sha384",
    "sha384WithRSAEncryption",
    "sha512",
    "sha512-224",
    "sha512-224WithRSAEncryption",
    "sha512-256",
    "sha512-256WithRSAEncryption",
    "sha512WithRSAEncryption",
    "shake128",
    "shake256",
    "sm3",
    "sm3WithRSAEncryption",
    "ssl3-md5",
    "ssl3-sha1",
];

function generateRandomSeed() {
    const systemRandom = crypto.randomBytes(1024).toString("hex");
    const serverTimestamp = Date.now().toString(16);

    const randomValues = [];
    for (let i = 0; i < 25; i++) {
        randomValues.push(crypto.randomBytes(128).toString("hex"));
    }

    let combinedEntropy =
        systemRandom + serverTimestamp + randomValues.join("");

    let hashing = combinedEntropy;
    algorithms.forEach((algorithm) => {
        hashing = crypto.createHash(algorithm).update(hashing).digest("hex");
    });
    const additionalRandomness = crypto.randomBytes(128).toString("hex");

    const finalEntropy =
        hashing + additionalRandomness + Date.now().toString(16);
    const finalHash = crypto
        .createHash("sha512")
        .update(finalEntropy)
        .digest("hex");

    const finalEntropyWithEnv =
        finalHash + crypto.randomBytes(32).toString("hex");

    const ultimateSeed = crypto
        .createHash("sha512")
        .update(finalEntropyWithEnv)
        .digest("hex");

    return ultimateSeed;
}

module.exports = {
    generateRandomSeed
};
