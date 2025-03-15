const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token;

    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;  // Token'ı cookie'den al
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded  // Kullanıcı kimliğini middleware içinde sakla
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, invalid token' });
    }
};

module.exports = protect;
