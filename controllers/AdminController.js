const  {Admin} = require('../models')
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
let access_token;

class AdminController {
    static async AdminLogin(req, res) {
        const { username, password } = req.body;
        const admin = await Admin.findOne({
            where:{
                username
            }
        });
        if (!admin){
            throw new Error("Pastikan username benar");
        }
        const isCorrect = comparePassword(password, admin.password);
        if (!isCorrect){
            throw new Error("Pastikan password benar");
        }
        let payload = {
            id: admin.id,
            username: admin.username,
        };
        const access_token = generateToken(payload);
        return access_token;
    }

    static AdminLogout(req, res) {
        access_token = null;
        res.clearCookie("access_token");
        return res.redirect('/');
    }
  }
  
  module.exports = AdminController;