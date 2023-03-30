const fs = require('fs')
//асинхронна функція читанян файлу метод 1
/* fs.readFile('./test.txt', (err, data) => {
	if (err) throw err
	console.log(data.toString())
}) */
//асинхронна функція читанян файлу метод 2
/* fs.readFile('./test.txt', 'utf8', (err, data) => {
	if (err) throw err
	console.log(data.toString())
})
//спочатку виведеться другий метод
console.log('first print')
 */
/* //асинхронне читання файлу створення та запис в іншу папку, але через вложеність виконається все успішно.
fs.readFile('./test.txt', 'utf8', (err, data) => {
	//if (err) throw err or
	err ? console.log(err) : null
	fs.mkdir('./files', () => {
		fs.writeFile('./test2.txt', `${data} new text data`, () => {})
	})
}) */

//асинхронне читання файлу створення та запис в іншу папку, але через вложеність виконається все успішно.
fs.readFile('./test.txt', 'utf8', (err, data) => {
	err ? console.log(err) : null
	fs.mkdirSync('./files', () => {})
	fs.writeFileSync('./files/test2.txt', `${data} new text data`, err => {
		err ? console.log(err) : null
	})
})

setTimeout(() => {
	if (fs.existsSync('./files/test2.txt')) {
		fs.unlink('./files/test2.txt', () => {})
	}
}, 4000)

setTimeout(() => {
	if (fs.existsSync('./file')) {
		fs.rmdir('./files', () => {})
	}
}, 6000)
