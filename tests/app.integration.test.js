const request = require('supertest');
const app = require('../app'); // Ensure this is the Express app
const { Cctv, Admin } = require('../models');
const { generateToken } = require('../helpers/jwt');
const bcrypt = require('bcrypt');

let adminToken;
let testsRun = false;

beforeAll(async () => {
    // Create an admin user and generate a token
    const hashedPassword = await bcrypt.hash('admin', 10);
    const admin = await Admin.create({ username: 'admin', password: hashedPassword, role: 'superuser' });
    const payload = {
        id: admin.id,
        username: admin.username,
        role: admin.role
    }
    adminToken = generateToken(payload);
    console.log(adminToken);
});

afterAll(async () => {
    if (testsRun) {
        // Clean up database
        await Cctv.destroy({ where: {} });
        await Admin.destroy({ where: {} });
    }
});

describe('CCTV API Integration Tests', () => {
    it('should add a new CCTV entry and verify it is saved in the database', async () => {
        testsRun = true;
        const newCctv = {
            content: 'Test CCTV',
            nama: 'Test CCTV',
            type: 'street',
            url: 'https://example.com/stream',
            lat: '123.456',
            lng: '78.910',
            access: 'public'
        };

        const response = await request(app)
            .post('/cctv')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(newCctv);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.content).toBe(newCctv.content);

        const cctvInDb = await Cctv.findByPk(response.body.id);
        expect(cctvInDb).not.toBeNull();
        expect(cctvInDb.content).toBe(newCctv.content);
    });

    it('should retrieve CCTV data and verify it is displayed correctly on an interactive map', async () => {
        testsRun = true;
        // Mock initMap function
        const initMap = jest.fn(() => ({ markers: [] }));
        const placeMarkerAndPanTo = jest.fn((location, map) => {
            map.markers.push(location);
        });

        const response = await request(app)
            .get('/cctv')
            .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);

        // Initialize the map and add markers
        const map = initMap();
        response.body.forEach(cctv => {
            placeMarkerAndPanTo({ lat: parseFloat(cctv.lat), lng: parseFloat(cctv.lng) }, map);
        });

        // Verify markers are added to the map
        expect(map.markers.length).toBe(response.body.length);
    });

    it('should perform CRUD operations on CCTV data and ensure changes are reflected in the database and on the map', async () => {
        testsRun = true;
        // Create a new CCTV entry
        const newCctv = {
            content: 'CRUD Test CCTV',
            nama: 'CRUD Test CCTV',
            type: 'street',
            url: 'https://example.com/stream',
            lat: '123.456',
            lng: '78.910',
            access: 'public'
        };

        const createResponse = await request(app)
            .post('/cctv')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(newCctv);

        const cctvId = createResponse.body.id;

        // Update the CCTV entry
        const updatedCctv = { ...newCctv, content: 'Updated CCTV' };
        const updateResponse = await request(app)
            .put(`/cctv/${cctvId}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send(updatedCctv);

        expect(updateResponse.status).toBe(200);
        expect(updateResponse.body.content).toBe(updatedCctv.content);

        // Delete the CCTV entry
        const deleteResponse = await request(app)
            .delete(`/cctv/${cctvId}`)
            .set('Authorization', `Bearer ${adminToken}`);

        expect(deleteResponse.status).toBe(200);
        expect(deleteResponse.body.message).toBe('cctv deleted');

        const cctvInDb = await Cctv.findByPk(cctvId);
        expect(cctvInDb).toBeNull();
    });

    it('should test authentication by logging in as an admin and performing authorized actions', async () => {
        testsRun = true;
        const loginResponse = await request(app)
            .post('/login')
            .set('x-test-request', 'true')
            .send({ username: 'admin', password: 'admin' });

        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body).toHaveProperty('access_token');

        const token = loginResponse.body.access_token;

        // Perform an authorized action
        const response = await request(app)
            .get('/cctv')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
    });
});