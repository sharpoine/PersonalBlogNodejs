const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ username, email, password });

    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

const authUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.cookie('token', generateToken(user._id), {
            httpOnly: true,
            maxAge: 360000,
        })
        res.cookie('id', user._id, {
            httpOnly: true,
            maxAge: 360000,
        })
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
        });

        console.log(req.cookies.token)
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

module.exports = { registerUser, authUser };
