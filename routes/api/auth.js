const express = require('express');
const auth = require('../../middleware/auth');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const User = require('../../models/User');

// @route   GET api/auth
// @desc    Get user token from logged in user
// @access  Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');   
    }
});

// @route   POST api/auth
// @desc    Authenticate user and get token
// @access  Public
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });

        if (!user)
            return res.status(400).json({ errors: [{msg: 'Invalid Credentials'}]});

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
            return res.status(400).json({ errors: [{msg: 'Invalid Credentials'}]});

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json(token)
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');   
    }
});

module.exports = router;
