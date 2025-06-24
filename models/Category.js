const mongoose = require('mongoose');
const slugify = require('slugify')
const categorySchema = new mongoose.Schema({
    slug: { type: String, unique: true },
    title: { type: String, required: true },
});
categorySchema.pre('save', function(next){
    if (this.isModified('header')) {
        this.slug = slugify(this.header, {
            lower: true,       // Küçük harf yap
            strict: true,      // Özel karakterleri kaldır
            remove: /[*+~.()'"!:@]/g // Belirli karakterleri çıkar
        });
    }
    next()
})

module.exports = mongoose.model('Category', categorySchema);
