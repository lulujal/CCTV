const { Admin } = require('../models');
const AdminController = require('../controllers/AdminController');
const httpMocks = require('node-mocks-http');
const { hashPassword, comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const request = require('supertest');
const app = require('../app');
const bcrypt = require('bcrypt');

jest.mock('../models');
jest.mock('../helpers/bcrypt');
jest.mock('../helpers/jwt');

describe('AdminController', () => {
    let req, res;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        res.clearCookie = jest.fn();
        res.redirect = jest.fn();
    });

    describe('AdminLogin', () => {
        it('should return access token on successful login', async () => {
            const hashedPassword = await bcrypt.hash('password', 10);
            const admin = { id: 1, username: 'admin', password: hashedPassword, role: 'admin' };
            req.body = { username: 'admin', password: 'password' };
            Admin.findOne.mockResolvedValue(admin);
            comparePassword.mockResolvedValue(true);
            generateToken.mockReturnValue('token');

            const loginResponse = await AdminController.AdminLogin(req, res);

            expect(loginResponse.statusCode).toBe(200);
            expect(loginResponse.body).toHaveProperty('access_token', 'token');
        });

        it('should return 401 if username is incorrect', async () => {
            req.body = { username: 'wrong', password: 'password' };
            Admin.findOne.mockResolvedValue(null);

            const loginResponse = await AdminController.AdminLogin(req, res);

            expect(loginResponse.statusCode).toBe(401);
            expect(loginResponse.body).toHaveProperty('message', "Pastikan username benar");
        });

        it('should return 401 if password is incorrect', async () => {
            const hashedPassword = await bcrypt.hash('password', 10);
            const admin = { id: 1, username: 'admin', password: hashedPassword, role: 'admin' };
            req.body = { username: 'admin', password: 'wrong' };
            Admin.findOne.mockResolvedValue(admin);
            comparePassword.mockResolvedValue(false);

            const loginResponse = await AdminController.AdminLogin(req, res);

            expect(loginResponse.statusCode).toBe(401);
            expect(loginResponse.body).toHaveProperty('message', "Pastikan password benar");
        });

        it('should return 500 if there is a server error', async () => {
            req.body = { username: 'admin', password: 'password' };
            Admin.findOne.mockRejectedValue(new Error('Server error'));

            const loginResponse = await AdminController.AdminLogin(req, res);

            expect(loginResponse.statusCode).toBe(500);
            expect(loginResponse.body).toHaveProperty('message', 'Internal Server Error');
        });

    });

    describe('AdminLogout', () => {
        it('should clear access token and redirect', () => {
            AdminController.AdminLogout(req, res);

            expect(res.clearCookie).toHaveBeenCalledWith('access_token');
            expect(res.redirect).toHaveBeenCalledWith('/');
        });
    });

    describe('getAdmin', () => {
        it('should return all admins with status 200', async () => {
            const admins = [{ id: 1, username: 'admin', role: 'admin' }];
            Admin.findAll.mockResolvedValue(admins);

            await AdminController.getAdmin(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(admins);
        });

        it('should return status 500 on error', async () => {
            Admin.findAll.mockRejectedValue(new Error('Database error'));

            await AdminController.getAdmin(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });
    });

    describe('addAdmin', () => {
        it('should return 201 and the created admin', async () => {
            const newAdmin = { id: 1, username: 'admin', password: 'hashedPassword', role: 'admin' };
            req.body = { username: 'admin', password: 'password', role: 'admin' };
            hashPassword.mockResolvedValue('hashedPassword');
            Admin.create.mockResolvedValue(newAdmin);

            await AdminController.addAdmin(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(newAdmin);
        });
    });

    describe('updateAdmin', () => {
        it('should return 200 and the updated admin', async () => {
            const updatedAdmin = { id: 1, username: 'admin', password: 'hashedPassword', role: 'admin' };
            req.params = { id: 1 };
            req.body = { username: 'admin', password: 'password', role: 'admin' };
            hashPassword.mockResolvedValue('hashedPassword');
            Admin.update.mockResolvedValue([1, [updatedAdmin]]);

            await AdminController.updateAdmin(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([1, [updatedAdmin]]);
        });
    });

    describe('deleteAdmin', () => {
        it('should return 200 and the deleted admin', async () => {
            req.params = { id: 1 };
            Admin.destroy.mockResolvedValue(1);

            await AdminController.deleteAdmin(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(1);
        });
    });
});