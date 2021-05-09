// import path from 'path'
// path с импотром не работает
const path = require('path')

console.log(path.basename(__filename));
console.log(path.dirname(__filename));
console.log(path.extname(__filename));
console.log(path.parse(__filename).name);