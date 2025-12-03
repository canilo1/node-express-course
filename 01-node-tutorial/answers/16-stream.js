const fs = require('fs');


const stream = fs.createReadStream('../content/big.txt', {
  encoding: 'utf8',
  highWaterMark: 200 
});

let counter = 0;

stream.on('data', (chunk) => {
  counter++;
  console.log(`Received chunk #${counter}:`);
  console.log(chunk); 
});

stream.on('end', () => {
  console.log(`Stream ended. Total chunks received: ${counter}`);
});

stream.on('error', (error) => {
  console.error('Error reading the stream:', error);
});
