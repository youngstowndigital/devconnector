const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/',[
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    console.log(req.body);
    res.send('User route');
});

module.exports = router;
