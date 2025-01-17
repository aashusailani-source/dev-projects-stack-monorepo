const express = require('express');
const router = express.Router();
const { signup, login, deleteAccount, logout } = require('../controllers/authController'); 
const authenticateToken = require('../middleware/authMiddleware');

// signup route
router.post('/signup', signup);
// login route
router.post('/login', login);
// logout route
router.post('/logout', authenticateToken, logout )
// delete route
router.delete('/delete', authenticateToken, deleteAccount);

module.exports = router;