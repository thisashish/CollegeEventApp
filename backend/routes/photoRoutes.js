const express = require('express');
const { uploadPhoto } = require('../controllers/photoController');
// const authMiddleware = require('../middlewares/authMiddleware'); // Ensure this is the correct path
const upload = require('../middlewares/uploadMiddleware'); // Ensure this is the correct path
const authMiddleware = require('../middlewares/authMiddleware')
const Photo = require('../models/photoModel'); 
const User = require('../models/userModel'); // Your User model
const mongoose = require('mongoose');

const router = express.Router();

// Ensure that upload.single('photo') is the correct field name for the photo upload
router.post('/upload', authMiddleware, upload.single('photo'), uploadPhoto);
// router.get('/all',authMiddleware, getAllPhotos);

router.get('/all',authMiddleware, async (req, res) => {
    try {
        const photos = await Photo.find().exec();

        // Return photos without userProfilePhoto
        const photoDetails = photos.map(photo => ({
            _id: photo._id,
            url: photo.url,
            category: photo.category,
            description: photo.description,
            date: photo.date,
            user: photo.user // Include user ID for fetching profile photo separately
        }));
        
        res.json({
            message: 'Photos retrieved successfully',
            photos: photoDetails
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



router.get('/yourPhotos', authMiddleware, async (req, res) => {
    try {
      const photos = await Photo.find({ userId: req.user._id }); // Assuming you have userId in photo schema
      if (!photos.length) {
        return res.status(404).json({ message: 'No photos found for this user' });
      }
      res.status(200).json({ message: 'Photos retrieved successfully', photos });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });

  
  // Route to get user profile photo by user ID
  // routes/photoRoutes.js
router.get('/profilePhoto/:userId', authMiddleware,async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid User ID format' });
        }

        const user = await User.findById(userId).exec();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            message: 'Profile photo retrieved successfully',
            profilePhoto: user.profilePhoto || ''
        });
    } catch (error) {
        console.error('Error fetching user profile photo:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

  
  
  

module.exports = router;
