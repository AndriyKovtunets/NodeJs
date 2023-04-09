const express = require('express')
const path = require('path')
const morgan = require('morgan')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
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

// middleware method for Override method post to put in form
app.use(methodOverride('_method'))

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
	Post.findById(req.params.id)
		.sort({ createdAt: -1 })
		.then(post => res.render(createPath('post'), { post, title }))
		.catch(error => {
			console.log(error)
			res.render(createPath('error'), { title: 'Error' })
		})
})

app.delete('/posts/:id', (req, res) => {
	const title = 'Post'
	Post.findByIdAndDelete(req.params.id)
		.then(result => res.sendStatus(200))
		.catch(error => {
			console.log(error)
			res.render(createPath('error'), { title: 'Error' })
		})
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

app.get('/edit/:id', (req, res) => {
	const title = 'Edit Post'
	Post.findById(req.params.id)
		.then(post => res.render(createPath('edit-post'), { post, title }))
		.catch(error => {
			console.log(error)
			res.render(createPath('error'), { title: 'Error' })
		})
})

app.put('/edit/:id', (req, res) => {
	const { title, author, text } = req.body
	const { id } = req.params
	Post.findByIdAndUpdate(id, { title, author, text })
		.then(post => res.redirect(`/posts/${id}`))
		.catch(error => {
			console.log(error)
			res.render(createPath('error'), { title: 'Error' })
		})
})

app.post('/add-post', (req, res) => {
	const { title, author, text } = req.body
	const post = new Post({ title, author, text })
	Post.save()
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
