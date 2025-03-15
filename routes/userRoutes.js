const express = require('express');
const router = express.Router();
const { registerUser, authUser, checkUser } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/checkUser', protect, checkUser)

router.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
    });

    res.json({ message: "Logout successful" });
});

module.exports = router;
