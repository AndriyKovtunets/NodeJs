const express = require('express')
const {
	getPost,
	duplicatePost,
	deletePost,
	getEditPost,
	editPost,
	getPosts,
	getAddPost,
	addPost,
} = require('../controllers/post-controller')

const router = express.Router()

router.get('/posts/:id', getPost)
router.delete('/posts/:id', deletePost)
router.post('/posts/:id', duplicatePost)
router.get('/edit/:id', getEditPost)
router.put('/edit/:id', editPost)
router.get('/posts', getPosts)
router.get('/add-post', getAddPost)
router.post('/add-post', addPost)

module.exports = router
