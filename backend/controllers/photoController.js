const Photo = require('../models/photoModel'); 
const User = require('../models/userModel'); // Your User model

exports.uploadPhoto = async (req, res) => {
  try {
      const { category, description } = req.body;

      // Check if the file was uploaded
      if (!req.file) {
          return res.status(400).json({ message: 'No file uploaded' });
      }

      // Ensure req.user is available and the user is authenticated
      if (!req.user || !req.user._id) {
          return res.status(401).json({ message: 'User not authenticated' });
      }

      // Create a photo object and associate the user
      const photo = {
          url: req.file.path, // Path of the uploaded file
          category,
          description,
          date: new Date().toLocaleDateString('en-GB'), // Format date as dd/mm/yyyy
          user: req.user._id // Set the authenticated user's ID
      };

      // Save the photo to the database
      const newPhoto = await Photo.create(photo);

      // Respond with success message and photo details
      res.status(201).json({ message: 'Photo uploaded successfully', photo: newPhoto });
  } catch (error) {
      // Handle any errors
      res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// exports.uploadPhoto = async (req, res) => {
//   try {
//       const { category, description } = req.body;

//       // Check if the file was uploaded
//       if (!req.file) {
//           return res.status(400).json({ message: 'No file uploaded' });
//       }

//       // Ensure req.user is available and the user is authenticated
//       if (!req.user || !req.user._id) {
//           return res.status(401).json({ message: 'User not authenticated' });
//       }

//       // Create a photo object and associate the user
//       const photo = {
//           url: req.file.path, // Path of the uploaded file
//           category,
//           description,
//           date: new Date().toLocaleDateString('en-GB'), // Format date as dd/mm/yyyy
//           user: req.user._id // Set the authenticated user's ID
//       };

//       // Save the photo to the database
//       const newPhoto = await Photo.create(photo);

//       // Respond with success message and photo details
//       res.status(201).json({ message: 'Photo uploaded successfully', photo: newPhoto });
//   } catch (error) {
//       // Handle any errors
//       res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };
