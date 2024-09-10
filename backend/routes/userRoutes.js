const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// Route to get user details by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            name: user.name,
            profilePhoto: user.profilePhoto,
            course: user.course,
            collegeYear: user.collegeYear,
            email: user.email,
            password: user.password 
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
