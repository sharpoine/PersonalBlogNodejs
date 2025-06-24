const mongoose = require('mongoose');
const slugify = require('slugify')
const postSchema = new mongoose.Schema({
    slug: { type: String, unique: true },
    header: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    image: { type: String },
    date_publish: { type: Date, default: Date.now }
});
postSchema.pre('save', async function (next) {
    if (!this.isModified('header')) return next();

    const baseSlug = slugify(this.header, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g
    });

    let slug = baseSlug;
    let counter = 1;

    // Slug eşleşen başka post var mı diye kontrol et
    while (await mongoose.models.Post.findOne({ slug })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
    }

    this.slug = slug;
    next();
});

module.exports = mongoose.model('Post', postSchema);
