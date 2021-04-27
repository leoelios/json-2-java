const fs = require('fs');
const contentReplacer = require('./core/global/contentReplacer');

const file = fs.readFileSync('./test/archives/ArquivoTeste').toString();

console.log(
  contentReplacer(file, {
    imports: 'TESTING REPLACER',
  })
);
