const {Admin} = require('../models')
const {verifyToken} = require('../helpers/jwt')

async function authentication(req, res, next){
    try {
        const {access_token} = req.cookies
        if (!access_token){
            throw {message: 'authentication failed', statusCode: 401}
        }
        const decoded = verifyToken(access_token)
        const user = await Admin.findOne({
            where:{
                username: decoded.username
            }
        })
        if (!user){
            throw {message: 'authentication failed', statusCode: 401}
        }
        req.user = decoded
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = {
    authentication
}