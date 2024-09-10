const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    url: { type: String, required: true },
    category: { type: String },
    description: { type: String },
    date: { type: String, default: new Date().toLocaleDateString('en-GB') },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Ensure this is defined
});

module.exports = mongoose.model('Photo', photoSchema);
