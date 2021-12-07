const express = require('express');
const { validationResult, check } = require('express-validator');
const auth = require('../../middleware/auth');
const router = express.Router();

const User = require('../../models/User');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post('/', [ auth, [
    check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    try {
        const user = await User.findById(req.user.id).select('-password');

        const post = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });

        await post.save();

        res.json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');   
    }
});

module.exports = router;
