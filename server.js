const express = require('express')
const path = require('path')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Post = require('./models/post')
const Contact = require('./models/contact')

const app = express()

app.set('view engine', 'ejs')

const PORT = 3000

const db =
	'mongodb+srv://andriyko2009:bU9VDfK4LznjK52@mycluster.jkowlfo.mongodb.net/node-blog?retryWrites=true&w=majority'

mongoose
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(res => console.log('Connected to DB'))
	.catch(error => console.log(error))

const createPath = page => path.resolve(__dirname, 'ejs-views', `${page}.ejs`)

app.listen(PORT, 'localhost', error => {
	error ? console.log(error) : console.log(`listening port ${PORT}`)
})
//використовуємо middleware модуль  HTTP request logger middleware for node.js
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(express.urlencoded({ extended: false }))

//middleware method for access to folder for client
app.use(express.static('styles'))

app.get('/', (req, res) => {
	const title = 'Home'
	// res.send('<h1>Hello world<h1>')
	res.render(createPath('index'), { title })
})

app.get('/contacts', (req, res) => {
	const title = 'Contacts'
	Contact.find()
		.then(contacts => res.render(createPath('contacts'), { contacts, title }))
		.catch(error => {
			console.log(error)
			res.render(createPath('error'), { title: 'Error' })
		})
})

app.get('about-us', (req, res) => {
	const title = 'Contacts'
	res.render('/contacts')
})

app.get('/posts/:id', (req, res) => {
	const title = 'Post'
	const post = {
		id: '1',
		text: 'Lorem ipsum dolor',
		title: 'Post title',
		date: '05.05.2021',
		author: 'Andrii',
	}
	res.render(createPath('post'), { title, post })
})

app.get('/posts', (req, res) => {
	const title = 'Posts'
	Post.find()
		.sort({ createdAt: -1 })
		.then(posts => res.render(createPath('posts'), { posts, title }))
		.catch(error => {
			console.log(error)
			res.render(createPath('error'), { title: 'Error' })
		})
})

app.post('/add-post', (req, res) => {
	const { title, author, text } = req.body
	const post = new Post({ title, author, text })
	post
		.save()
		.then(result => res.redirect('/posts'))
		.catch(error => {
			console.log(error)
			res.render(createPath('error'), { title: 'Error' })
		})
})

app.get('/add-post', (req, res) => {
	const title = 'Add post'
	res.render(createPath('add-post'), { title })
})

app.use((req, res) => {
	const title = 'Error'
	res.status(404).render(createPath('error'), { title })
})
