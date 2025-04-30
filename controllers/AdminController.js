const { Admin } = require('../models');
const { hashPassword, comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class AdminController {
    static async AdminLogin(req, res) {
        try {
            const { username, password } = req.body;
            console.log('Login attempt:', username);
            const admin = await Admin.findOne({
                where: {
                    username
                }
            });
            if (!admin) {
                console.log('Admin not found');
                res.status(401).json({ message: "Pastikan username benar" });
                return;
                // return { statusCode: 401, body: { message: "Pastikan username benar" } };
            }
            const isCorrect = await comparePassword(password, admin.password);
            if (!isCorrect) {
                console.log('Incorrect password');
                res.status(401).json({ message: "Pastikan password benar" });
                return;
                // return { statusCode: 401, body: { message: "Pastikan password benar" } };
            }
            let payload = {
                id: admin.id,
                username: admin.username,
                role: admin.role,
            };
            const access_token = generateToken(payload);
            console.log('Login successful:', payload);
            res.cookie("access_token", access_token, { httpOnly: true });
            return res.status(200).json({ access_token , redirectUrl: '/admin-map'});
        } catch (error) {
            console.log('Login error:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static AdminLogout(req, res) {
        res.clearCookie("access_token");
        return res.redirect('/');
    }

    static async getAdmin(req, res) {
        try {
            const users = await Admin.findAll();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async updateAdmin(req, res) {
        try {
            const { id } = req.params;
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
            return res.status(500).json({ message: 'Internal Server Error' });
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
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async addAdmin(req, res) {
        try {
            const { username, password, role } = req.body;
            const admin = await Admin.create({
                username,
                password: await hashPassword(password),
                role
            });
            return res.status(201).json(admin);
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = AdminController;