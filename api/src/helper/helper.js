const fs = require('fs');
const crypto = require('crypto');

function calculateHash(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256'); 
    const stream = fs.createReadStream(filePath);
    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
    stream.on('error', (err) => reject(err));
  });
}

async function compareFileHashes(file1, file2) {
  try {
    const hash1 = await calculateHash(file1);
    const hash2 = await calculateHash(file2);
    return (hash1 === hash2);
  } catch (error) {
    console.error('Erro ao calcular os hashes:', error.message);
  }
}

module.exports = {compareFileHashes};