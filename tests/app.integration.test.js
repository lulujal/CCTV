const request = require('supertest');
const app = require('../app');
const { Cctv, Admin } = require('../models');
const { generateToken } = require('../helpers/jwt');
const bcrypt = require('bcrypt');

describe('CCTV API Integration Tests', () => {
    let adminToken;

    beforeAll(async () => {
        const hashedPassword = await bcrypt.hash('admin', 10);
        const admin = await Admin.create({ username: 'admin', password: hashedPassword, role: 'superuser' });
        const payload = { id: admin.id, username: admin.username, role: admin.role };
        adminToken = generateToken(payload);
    });

    afterAll(async () => {
        await Admin.destroy({ where: {} });
        await Cctv.destroy({ where: {} });
    });

    describe('Add CCTV Data', () => {
        it('should add new CCTV data and verify it in the database', async () => {
            const newCctv = {
                content: 'Test Content',
                nama: 'Test CCTV',
                type: 'Outdoor',
                url: 'http://example.com',
                lat: '-7.049756',
                lng: '110.396445',
                access: 'public'
            };

            const response = await request(app)
                .post('/cctv')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(newCctv);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');

            const cctv = await Cctv.findByPk(response.body.id);
            expect(cctv).not.toBeNull();
            expect(cctv.nama).toBe(newCctv.nama);
        });
    });

    describe('Retrieve CCTV Data', () => {
        it('should retrieve CCTV data and display it on the map', async () => {
            const response = await request(app)
                .get('/cctv-public')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toBeGreaterThan(0);
        });
    });

    describe('Google Maps API Integration', () => {
        it('should visualize coordinates as markers on the map', async () => {
            const response = await request(app)
                .get('/')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            // Additional checks for map markers can be added here
        });
    });

    describe('CRUD Operations on CCTV Data', () => {
        let cctvId;

        beforeAll(async () => {
            const cctv = await Cctv.create({
                content: 'Test Content',
                nama: 'Test CCTV',
                type: 'Outdoor',
                url: 'http://example.com',
                lat: '-7.049756',
                lng: '110.396445',
                access: 'public'
            });
            cctvId = cctv.id;
        });

        it('should update CCTV data', async () => {
            const updatedData = { nama: 'Updated CCTV' };

            const response = await request(app)
                .put(`/cctv/${cctvId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send(updatedData);

            expect(response.status).toBe(200);
            expect(response.body.nama).toBe(updatedData.nama);

            const cctv = await Cctv.findByPk(cctvId);
            expect(cctv.nama).toBe(updatedData.nama);
        });

        it('should delete CCTV data', async () => {
            const response = await request(app)
                .delete(`/cctv/${cctvId}`)
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);

            const cctv = await Cctv.findByPk(cctvId);
            expect(cctv).toBeNull();
        });
    });

    describe('Authentication and Authorization', () => {
        it('should login as admin and access the management dashboard', async () => {
            const loginResponse = await request(app)
                .post('/login')
                .send({ username: 'admin', password: 'admin' });
        
            expect(loginResponse.status).toBe(302); // Expecting a redirect status
        
            const cookies = loginResponse.headers['set-cookie'];
            const dashboardResponse = await request(app)
                .get('/admin-map')
                .set('Cookie', cookies);
        
            expect(dashboardResponse.status).toBe(200);
        });

        it('should perform authorized actions', async () => {
            const newCctv = {
                content: 'Authorized Content',
                nama: 'Authorized CCTV',
                type: 'Outdoor',
                url: 'http://example.com',
                lat: '-7.049756',
                lng: '110.396445',
                access: 'public'
            };

            const response = await request(app)
                .post('/cctv')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(newCctv);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
        });
    });
});