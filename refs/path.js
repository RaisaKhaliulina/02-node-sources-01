const path = require("path");

console.log(path.dirname(__filename))
console.log(path.basename(__filename))
console.log(path.extname(__filename))
console.log(path.parse(__filename))
console.log(path.resolve(__dirname, "..", "./modules", "./app"))
console.log(path.join(__dirname, "..", "./modules", "./app"))