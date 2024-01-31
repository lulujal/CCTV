const  {Admin} = require('../models')
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
let access_token;

class AdminController {
    static AdminLogin(req, res) {
      const { username, password } = req.body;
      Admin.findOne({
          where:{
              username
          }
      })
      .then(admin=>{
          if (!admin){
              return res.status(400).json({ message: "login error: pastikan username benar" });
          }
          const isCorrect = comparePassword(password, admin.password);
          if (!isCorrect){
              return res.status(400).json({ message: "login error: pastikan password benar" });
          }
          let payload = {
              id: admin.id,
              username: admin.username,
          };
          access_token = generateToken(payload);
          res.cookie("access_token", access_token);
          return res.redirect('/map');
      })
    }

    static AdminLogout(req, res) {
        access_token = null;
        res.clearCookie("access_token");
        return res.redirect('/');
    }
  }
  
  module.exports = AdminController;