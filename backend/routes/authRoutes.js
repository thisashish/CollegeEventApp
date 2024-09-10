const express = require('express');
const { register, login,logout, forgotPassword, resetPassword } = require('../controllers/authController');
const upload = require('../middlewares/uploadMiddleware');
const router = express.Router();

// router.post('/register', register);
router.post('/register', upload.single('profilePhoto'), register);
router.post('/login', login);
// router.post('/logout', logout); // Add this route
// router.post('/forgot-password', forgotPassword); // Add this route
// router.post('/reset-password/:token', resetPassword); // Add this route


module.exports = router;
