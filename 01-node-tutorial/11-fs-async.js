const { readFile, writeFile } = require('fs')

console.log('start')
readFile('./content/first.txt', 'utf8', (err, result) => {
  if (err) {
    console.log(err)
    return
  }
  const first = result
  readFile('./content/second.txt', 'utf8', (err, result) => {
    if (err) {
      console.log(err)
      return
    }
    const second = result
    writeFile(
      './content/result-async.txt',
      `Here is the result : ${first}, ${second}`,
      (err, result) => {
        if (err) {
          console.log(err)
          return
        }
        console.log('done with this task')
      }
    )
  })
})
console.log('starting next task')
console.log('starting next task');
writeFile('./temporary/fileB.txt', 'This is line 1\n', (err) => {
  if (err) {
    console.log('This error happened: ', err);
    return;
  }
  console.log('at point 1');
  writeFile('./temporary/fileB.txt', 'This is line 2\n', { flag: 'a' }, (err) => {
    if (err) {
      console.log('This error happened: ', err);
      return;
    }
    console.log('at point 2');
    writeFile('./temporary/fileB.txt', 'This is line 3\n', { flag: 'a' }, (err) => {
      if (err) {
        console.log('This error happened: ', err);
        return;
      }
      console.log('at point 3');
      console.log('File writing complete!');
    });
  });
});

console.log('at end');