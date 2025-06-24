const Category = require('../models/Category');
const Post = require('../models/Post');
const jwt = require('jsonwebtoken')

const uploadImage = async (req, res) => {
    console.log("Çerezler:", req.cookies);
    console.log("Yüklenen Dosya:", req.file);



    if (!req.file) {
        return res.status(400).json({ message: 'Dosya yüklenemedi, lütfen tekrar deneyin.' });
    }

    try {
        const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
        return res.status(201).json({ image: `${baseUrl}/uploads/${req.file.filename}` });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const createPost = async (req, res) => {

    const id = req.user.id;

    if (!id) {
        return res.status(401).json({ message: 'Kullanıcı bulunamadı' });
    }

    try {
        const { content, header, category } = req.body;
        const post = new Post({
            header,
            content,
            category,
            user: id,
            image: `/uploads/${req.file.filename}`
        });
        const createdPost = await post.save();
        res.status(201).json({ ...createdPost, message: 'Post başarıyla oluşturuldu!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getPost = async (req, res) => {
    try {
        const slug = req.params.slug
        let posts = await Post.findOne({ slug: slug })
        const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
        posts.image = baseUrl + posts.image
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getPosts = async (req, res) => {
    try {
        const cat = req.query.category
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        let posts;
        const filter = {};
        if (cat) {
            const category = await Category.findOne({ slug: cat });
            if (!category) return res.status(404).json({ error: 'Kategori bulunamadı' });

            filter.category = category._id
        }

        posts = await Post.find(filter)
            .populate('user', 'username')
            .populate('category')
            .skip(Number(skip))
            .limit(Number(limit))

        const totalCount = await Post.countDocuments(filter);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { createPost, getPosts, getPost, uploadImage };
