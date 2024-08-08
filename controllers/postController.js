const Post = require('../models/Post');


const createPost = async (req, res) => {
    console.log(req.cookies.token)
    try {
        const { content } = req.body;
        const post = new Post({
            content,
            user: req.cookies.id,
            image: `/uploads/${req.file.filename}`
        });
        const createdPost = await post.save();
        res.status(201).json(createdPost);
    } catch (error) {
         res.status(400).json({ message: error.message });
    }
};

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'username email');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createPost, getPosts };
