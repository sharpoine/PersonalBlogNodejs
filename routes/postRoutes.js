const express = require('express');
const router = express.Router();
const { createPost, getPosts, getPost } = require('../controllers/postController');
const multer = require('multer');
const path = require('path');

// Yükleme dosyalarının nereye kaydedileceğini ve dosya adını ayarlıyoruz
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // 'uploads' klasörüne kaydedilecek
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));  // Benzersiz bir dosya adı oluşturuyoruz
  }
});
// Yükleme işlemi için multer'ı ayarlıyoruz
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },  // Maksimum dosya boyutu: 5MB
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Sadece resim dosyaları yüklenebilir!'));
    }
  }
});

router.route('/')
  .post(upload.single('image'), createPost)
  .get(getPosts)



module.exports = router;
