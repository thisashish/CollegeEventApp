const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB limit
    fileFilter: (req, file, cb) => {
        // Accept only image files
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Invalid file type'), false);
        }
        cb(null, true);
    }
});

module.exports = upload;
