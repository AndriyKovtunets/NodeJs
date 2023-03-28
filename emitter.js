const Logger = require('./log')
const logger = new Logger()

// метод он створює слідкування за подією. 1 аргумент те за чим слідкуємо.
logger.on('some_event', args => {
	const { id, text } = args
	console.log(id, text)
})

logger.log('User Logged!')
