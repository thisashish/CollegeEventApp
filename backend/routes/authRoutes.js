const express = require('express');
const { register, login } = require('../controllers/authController');
const upload = require('../middlewares/uploadMiddleware');
const router = express.Router();

// router.post('/register', register);
router.post('/register', upload.single('profilePhoto'), register);
router.post('/login', login);

module.exports = router;
