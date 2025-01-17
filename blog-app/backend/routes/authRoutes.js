const express = require('express');
const router = express.Router();
const { signup, login, deleteAccount, logout, getUserProfile } = require('../controllers/authController'); 
const authenticateToken = require('../middleware/authMiddleware');

// signup route
router.post('/signup', signup);
// login route
router.post('/login', login);
// logout route
router.post('/logout', authenticateToken, logout )
// delete route
router.delete('/delete', authenticateToken, deleteAccount);
// get user profile
router.get('/profile', authenticateToken, getUserProfile);


module.exports = router;