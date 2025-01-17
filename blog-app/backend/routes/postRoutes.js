const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const { getPosts, getPostById, createPost, updatePost, deletePost, getPostsByAuthor } = require('../controllers/postController');

// public routes
router.get('/', getPosts);
router.get('/:id', getPostById);

// Protected routes (authentication required)
router.get('/author', authenticateToken, getPostsByAuthor);
router.post('/create', authenticateToken, createPost);
router.put('/update/:id', authenticateToken, updatePost);
router.delete('/delete/:id', authenticateToken, deletePost);

module.exports = router;