// console.log(__dirname)
// console.log(__filename)
// console.log(process)
// console.log(process.env)
// console.log(process.argv) // містить масив аргкментів командної строки термінала. МОжна передавати декілька аргументів
// console.log(`Hello, ${process.argv[2]}`)
const url = new URL('https://webDev.com/path/name') //URL це коонструктор
console.log(url.hostname)
console.log(url.href)
console.log(url.pathname)
console.log(url.hash)
