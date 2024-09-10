const Post = require('../models/Post');


const createPost = async (req, res) => {
    const id=req.cookies.id

    if (!id) {
        return res.status(401).json({ message: 'Kullanıcı bulunamadı' });
    }

    try {
        const { content, header } = req.body;
        const post = new Post({
            header,
            content,
            user: id,
            image: `/uploads/${req.file.filename}`
        });
        const createdPost = await post.save();
        res.status(201).json(createdPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getPost = async (id) => {
    try {
        const posts = await Post.findOne({ _id: id })
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getPosts = async (req, res) => {
    try {
        const id = req.body.id
        let posts;
        if (id) {
            posts = await Post.find({ _id: id })
        } else {
            posts = await Post.find({}).select("_id image header date_publish")
        }
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { createPost, getPosts };
