const { Admin } = require('../models');
const { verifyToken } = require('../helpers/jwt');

async function authentication(req, res, next) {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            console.log('No auth token');
            return res.status(401).json({ message: 'authentication failed' });
        }
        const decoded = verifyToken(token);
        const user = await Admin.findOne({
            where: {
                username: decoded.username
            }
        });
        if (!user) {
            console.log('User not found');
            return res.status(401).json({ message: 'authentication failed' });
        }
        req.user = decoded;
        next();
    } catch (error) {
        console.log('Authentication error:', error);
        next(error);
    }
}

module.exports = { authentication };