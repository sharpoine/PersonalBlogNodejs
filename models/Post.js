const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    image: { type: String },
    date_publish: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);
