const fs = require('fs');
const compressor = require('../index');

const data = JSON.parse(fs.readFileSync('examples/data.json'));

const compressedData = compressor(data);
console.log(`Uncompressed length: ${data.length}`);
console.log(`Compressed length: ${compressedData.length}`);

/**
 * Uncompressed length: 26953
 * Compressed length: 2339
 */
