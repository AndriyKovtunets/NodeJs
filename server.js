const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

const postApiRouter = require('./routes/api-post-routes')
const postRoutes = require('./routes/post-routes')
const contactRoutes = require('./routes/contact-routes')
const createPath = require('./helpers/create-path')

const app = express()

app.set('view engine', 'ejs')

const PORT = 3000

const db =
	'mongodb+srv://andriyko2009:bU9VDfK4LznjK52@mycluster.jkowlfo.mongodb.net/node-blog?retryWrites=true&w=majority'

mongoose
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(res => console.log('Connected to DB'))
	.catch(error => console.log(error))

app.listen(PORT, 'localhost', error => {
	error ? console.log(error) : console.log(`listening port ${PORT}`)
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
