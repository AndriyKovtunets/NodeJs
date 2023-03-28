const EventEmitter = require('events') //оголошуємо клас следителя

class Logger extends EventEmitter {
	//конструктор який унаслідує все від емітера + додає новий функціонал
	log = msg => {
		console.log(msg)
		//викликаємо нашу подію
		this.emit('some_event', { id: 1, text: 'Event test text!' })
	}
}

module.exports = Logger
