const  {Admin} = require('../models')
const {hashPassword} = require('../helpers/bcrypt')
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
            role: admin.role,
        };
        const access_token = generateToken(payload);
        return access_token;
    }

    static AdminLogout(req, res) {
        access_token = null;
        res.clearCookie("access_token");
        return res.redirect('/');
    }

    static async getAdmin(req, res) {
        try {
            const users = await Admin.findAll();
            return res.status(200).json(users);
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error'});
        }
    }

    static async updateAdmin(req, res) {
      try {  const { id } = req.params;
        const { username, password, role } = req.body;
        const admin = await Admin.update({
            username,
            password: await hashPassword(password),
            role
        }, {
            where: {
                id
            }
        });
        return res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
        }
    }

    static async deleteAdmin(req, res) {
        try {
            const { id } = req.params;
            const admin = await Admin.destroy({
                where: {
                    id
                }
            });
            return res.status(200).json(admin);
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error'});
        }
    }

    static async addAdmin(req, res) {
        const { username, password, role } = req.body;
        const admin = await Admin.create({
            username,
            password: await hashPassword(password),
            role
        });
        return res.status(201).json(admin);
    }
  }
  
  module.exports = AdminController;