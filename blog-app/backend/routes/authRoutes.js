const express = require('express');
const router = express.Router();
const { signup, login, deleteAccount } = require('../controllers/authController'); 
const authenticateToken = require('../middleware/authMiddleware');

// signup route
router.post('/signup', signup);
// login route
router.post('/login', login);
// delete route
router.delete('/delete', authenticateToken, deleteAccount);

module.exports = router;