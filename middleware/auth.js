const jwt = require('jsonwebtoken');
const config = require('config');

const auth = async (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token)
        return res.status(401).json({ msg: 'Not token, authorization denied' });

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();
    } catch (error) {
        console.error(error.message);
        res.status(401).json({ msg: 'Token is not valid' });
    }
}

module.exports = auth;
