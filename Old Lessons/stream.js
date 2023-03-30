const fs = require('fs')
const zlib = require('zlib')

const readStream = fs.createReadStream('./docs/text.txt')
const writeStream = fs.createWriteStream('./docs/new-text.txt')
const compressStream = zlib.createGzip() //зжимаючий потік

//крч буфер обробляє інформацію порційно

//тут використовуємо дуплексний підхід коли  читаємо і записуємо
/* readStream.on('data', chunk => {
	writeStream.write('\n---CHUNK START---\n')
	writeStream.write(chunk)
	writeStream.write('\n---CHUNK END---\n')
}) */

const handleError = () => {
	console.log('Error')
	readStream.destroy()
	writeStream.end('Finished with error...')
}

//а pipe аналогічний короткий метод
readStream
	.on('error', handleError)
	.pipe(compressStream)
	.pipe(writeStream)
	.on('error', handleError)
