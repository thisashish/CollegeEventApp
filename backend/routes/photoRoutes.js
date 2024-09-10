const express = require("express");
const { uploadPhoto } = require("../controllers/photoController");
// const authMiddleware = require('../middlewares/authMiddleware'); // Ensure this is the correct path
const upload = require("../middlewares/uploadMiddleware"); // Ensure this is the correct path
const authMiddleware = require("../middlewares/authMiddleware");
const Photo = require("../models/photoModel");
const User = require("../models/userModel"); // Your User model
const mongoose = require("mongoose");

const router = express.Router();

// Ensure that upload.single('photo') is the correct field name for the photo upload
router.post("/upload", authMiddleware, upload.single("photo"), uploadPhoto);

router.get("/all", authMiddleware, async (req, res) => {
  try {
    const photos = await Photo.find().populate("user").exec();

    // Return photos with user details
    const photoDetails = photos.map((photo) => ({
      _id: photo._id,
      url: photo.url,
      category: photo.category,
      description: photo.description,
      date: photo.date,
      user: photo.user
        ? {
            _id: photo.user._id,
            name: photo.user.name,
            profilePhoto: photo.user.profilePhoto,
          }
        : null, // Include user details for each photo
    }));

    res.json({
      message: "Photos retrieved successfully",
      photos: photoDetails,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id).populate("user");
    if (!photo) {
      return res.status(404).json({ message: "Photo not found" });
    }
    res.json({ photo });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/yourPhotos", authMiddleware, async (req, res) => {
    try {
      const photos = await Photo.find({ user: req.user._id }); 
      console.log(photos,'xxxxxxxxxxxx');
      if (!photos.length) {
        return res.status(404).json({ message: "No photos found for this user" });
      }
      res.status(200).json({ message: "Photos retrieved successfully", photos });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
  

router.get("/profilePhoto/:_id", authMiddleware, async (req, res) => {
  try {
    const _id = req.params._id;
    if (!_id) {
      return res.status(400).json({ message: " _id is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: "Invalid _id format" });
    }

    const user = await User.findById(_id).exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Profile photo retrieved successfully",
      profilePhoto: user.profilePhoto || "",
    });
  } catch (error) {
    console.error("Error fetching user profile photo:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
