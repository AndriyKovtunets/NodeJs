const express = require('express')
const chalk = require('chalk')
const morgan = require('morgan')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
require('dotenv').config()

const postApiRouter = require('./routes/api-post-routes')
const postRoutes = require('./routes/post-routes')
const contactRoutes = require('./routes/contact-routes')
const createPath = require('./helpers/create-path')

const errorMsg = chalk.bgKeyword('white').redBright
const successMsg = chalk.bgKeyword('green').white

const app = express()

app.set('view engine', 'ejs')

mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(res => console.log(successMsg('Connected to DB')))
	.catch(error => console.log(errorMsg(error)))

app.listen(process.env.PORT, 'localhost', error => {
	error
		? console.log(errorMsg(error))
		: console.log(successMsg(`listening port ${process.env.PORT}`))
})
//використовуємо middleware модуль  HTTP request logger middleware for node.js
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

//analog body-parser. парсить дані з форм
app.use(express.urlencoded({ extended: false }))

//middleware method for access to folder for client
app.use(express.static('styles'))

// middleware method for Override method post to put in form
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
	const title = 'Home'
	res.render(createPath('index'), { title })
})

app.use(postRoutes)
app.use(contactRoutes)
app.use(postApiRouter)

app.use((req, res) => {
	const title = 'Error'
	res.status(404).render(createPath('error'), { title })
})
