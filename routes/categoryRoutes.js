const express = require('express');
const router = express.Router();
const { getCategories,createCategory } = require('../controllers/categoryController');
const protect = require('../middleware/authMiddleware');

router.get('/get', getCategories);
router.post('/create', protect, createCategory)

module.exports = router;
