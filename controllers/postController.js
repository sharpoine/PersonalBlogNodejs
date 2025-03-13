const Post = require('../models/Post');

const uploadImage = async (req, res) => {
    console.log("Çerezler:", req.cookies);
    console.log("Yüklenen Dosya:", req.file);

    const id = req.cookies.id;
    if (!id) {
        return res.status(401).json({ message: 'Kullanıcı Bulunamadı' });
    }

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
    const id = req.cookies.id

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
        res.status(201).json({...createdPost,message:'Post başarıyla oluşturuldu!'});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getPost = async (req, res) => {
    try {
        const slug = req.params.slug
        const posts = await Post.findOne({ slug: slug })
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
            posts = await Post.find({}).select("_id slug image header date_publish")
        }
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { createPost, getPosts, getPost, uploadImage };
