const mongoose = require('mongoose');
const slugify = require('slugify')
const postSchema = new mongoose.Schema({
    slug: { type: String, unique: true },
    header: { type: String, required: true },
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    image: { type: String },
    date_publish: { type: Date, default: Date.now }
});
postSchema.pre('save', function(next){
    if (this.isModified('header')) {
        this.slug = slugify(this.header, {
            lower: true,       // Küçük harf yap
            strict: true,      // Özel karakterleri kaldır
            remove: /[*+~.()'"!:@]/g // Belirli karakterleri çıkar
        });
    }
    next()
})

module.exports = mongoose.model('Post', postSchema);
