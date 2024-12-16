const { Cctv } = require('../models');
const cctvController = require('../controllers/cctvController');
const httpMocks = require('node-mocks-http');

jest.mock('../models');

describe('cctvController', () => {
    let req, res;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
    });

    describe('getCctvs', () => {
        it('should return all CCTVs with status 200', (done) => {
            const cctvs = [{ id: 1, name: 'CCTV1' }];
            Cctv.findAll.mockResolvedValue(cctvs);

            cctvController.getCctvs(req, res);

            process.nextTick(() => {
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalledWith(cctvs);
                done();
            });
        });

        it('should return status 500 on error', (done) => {
            const error = new Error('Database error');
            Cctv.findAll.mockRejectedValue(error);

            cctvController.getCctvs(req, res);

            process.nextTick(() => {
                expect(res.status).toHaveBeenCalledWith(500);
                expect(res.json).toHaveBeenCalledWith({ message: error.message });
                done();
            });
        });
    });

    describe('getCctvE11', () => {
        it('should return all CCTVs in E11 with status 200', (done) => {
            const cctvs = [{ id: 1, name: 'CCTV1' }];
            Cctv.findAll.mockResolvedValue(cctvs);

            req.params = { access: 'E11' };
            cctvController.getCctvE11(req, res);

            process.nextTick(() => {
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalledWith(cctvs);
                done();
            });
        });

        it('should return status 500 on error', (done) => {
            const error = new Error('Database error');
            Cctv.findAll.mockRejectedValue(error);

            req.params = { access: 'E11' };
            cctvController.getCctvE11(req, res);

            process.nextTick(() => {
                expect(res.status).toHaveBeenCalledWith(500);
                expect(res.json).toHaveBeenCalledWith({ message: error.message });
                done();
            });
        });
    });

    describe('getCctvDC', () => {
        it('should return all CCTVs in Digital Center with status 200', (done) => {
            const cctvs = [{ id: 1, name: 'CCTV1' }];
            Cctv.findAll.mockResolvedValue(cctvs);

            req.params = { access: 'digital center' };
            cctvController.getCctvDC(req, res);

            process.nextTick(() => {
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalledWith(cctvs);
                done();
            });
        });

        it('should return status 500 on error', (done) => {
            const error = new Error('Database error');
            Cctv.findAll.mockRejectedValue(error);

            req.params = { access: 'digital center' };
            cctvController.getCctvDC(req, res);

            process.nextTick(() => {
                expect(res.status).toHaveBeenCalledWith(500);
                expect(res.json).toHaveBeenCalledWith({ message: error.message });
                done();
            });
        });
    });

    describe('getCctvPublic', () => {
        it('should return all CCTVs in Public and Digital Center with status 200', (done) => {
            const cctvs = [{ id: 1, name: 'CCTV1' }];
            Cctv.findAll.mockResolvedValue(cctvs);

            req.params = { access: ['public', 'digital center'] };
            cctvController.getCctvPublic(req, res);

            process.nextTick(() => {
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalledWith(cctvs);
                done();
            });
        });

        it('should return status 500 on error', (done) => {
            const error = new Error('Database error');
            Cctv.findAll.mockRejectedValue(error);

            req.params = { access: ['public', 'digital center'] };
            cctvController.getCctvPublic(req, res);

            process.nextTick(() => {
                expect(res.status).toHaveBeenCalledWith(500);
                console.log("error message:", error)
                expect(res.json).toHaveBeenCalledWith({ message: error.message });
                done();
            });
        });
    });

    describe('addCctv', () => {
        it('should return 201 and the created CCTV', async () => {
            const newCctv = {
                id: 1,
                content: 'content',
                nama: 'nama',
                type: 'type',
                url: 'url',
                lat: 'lat',
                lng: 'lng',
                access: 'access',
                createdAt: new Date(),
                updatedAt: new Date()
            };
            req.body = {
                content: 'content',
                nama: 'nama',
                type: 'type',
                url: 'url',
                lat: 'lat',
                lng: 'lng',
                access: 'access'
            };
            Cctv.create.mockResolvedValue(newCctv);
    
            await cctvController.addCctv(req, res);
    
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(newCctv);
        });
    });

    describe('updateCctv', () => {
        it('should return 200 and the updated CCTV', async () => {
            const updatedCctv = {
                id: 1,
                content: 'content',
                nama: 'nama',
                type: 'type',
                url: 'url',
                lat: 'lat',
                lng: 'lng',
                access: 'access',
                createdAt: new Date(),
                updatedAt: new Date()
            };
            req.params = { id: 1 };
            req.body = {
                content: 'content',
                nama: 'nama',
                type: 'type',
                url: 'url',
                lat: 'lat',
                lng: 'lng',
                access: 'access'
            };
            Cctv.update.mockResolvedValue([1, [updatedCctv]]);
    
            await cctvController.updateCctv(req, res);
    
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(updatedCctv);
        });
    });

    describe ('deleteCctv', () => {
        it('should return 200 and the deleted CCTV', async () => {
            const deletedCctv = {
                id: 1,
                content: 'content',
                nama: 'nama',
                type: 'type',
                url: 'url',
                lat: 'lat',
                lng: 'lng',
                access: 'access',
                createdAt: new Date(),
                updatedAt: new Date()
            };
            req.params = { id: 1 };
            Cctv.destroy.mockResolvedValue(1);
            Cctv.findByPk.mockResolvedValue(deletedCctv);
    
            await cctvController.deletecctv(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'cctv deleted' });
        });
    });
});