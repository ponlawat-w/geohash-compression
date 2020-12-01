# `geohash-compressor`

Compressing string array of geohash

## Example

```js
const fs = require('fs');
const compressor = require('geohash-compressor');

const data = JSON.parse(fs.readFileSync('./data.json'));

const compressedData = compressor(data);
console.log(`Uncompressed length: ${data.length}`);
console.log(`Compressed length: ${compressedData.length}`);
```

### Result

```
Uncompressed length: 26953
Compressed length: 2339
```

### `data.json`
```json
["ezpgwfut","ezpgwfuv","ezpgwfvj","ezpgwfvm","ezpgwfvt","ezpgwfvv","ezpgwfyj","ezpgwfgh","ezpgwfgk","ezpgwfgs","ezpgwfgu","ezpgwfuh","ezpgwfuk","ezpgwfus","ezpgwfuu","ezpgwfvh","ezpgwfvk","ezpgwfvs","ezpgwfvu","ezpgwfyh","ezpgwfyk","ezpgwfys","ezpgwffg",...,"ezpgquns","ezpgqunu","ezpgquph","ezpgqupk","ezpgqups","ezpgqupu","ezpgqup7"]
```
