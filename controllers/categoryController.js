const Category = require('../models/Category');
const slugify = require('slugify')



const createCategory = async (req, res) => {

    const id = req.user.id;

    if (!id) {
        return res.status(401).json({ message: 'Kullanıcı bulunamadı' });
    }

    try {
        const { title } = req.body;
        const slug = slugify(title, {
            lower: true,        // Küçük harfe çevir
            strict: true,       // Sadece harf ve tire bırak
            locale: 'tr'        // Türkçe karakter desteği
        });

        const category = new Category({
            title,
            slug
        });
        const createdCategory = await category.save();
        res.status(201).json({ ...createdCategory, message: 'Kategori başarıyla oluşturuldu!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getCategories = async (req, res) => {
    try {
        categories = await Category.find({}).select("_id title slug")

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { createCategory, getCategories };