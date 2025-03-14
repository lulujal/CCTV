const { DenahGedung, cctvroom } = require('../models');
const DenahGedungController = require('../controllers/DenahGedungController');
const httpMocks = require('node-mocks-http');

jest.mock('../models');

describe('DenahGedungController', () => {
    let req, res;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        res.render = jest.fn().mockReturnValue(res);
    });

    describe('getDenahGedungs', () => {
        it('should return all DenahGedungs with status 200', async () => {
            const denahGedungs = [{ id: 1, nama_gedung: 'Gedung1' }];
            DenahGedung.findAll.mockResolvedValue(denahGedungs);

            await DenahGedungController.getDenahGedungs(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(denahGedungs);
        });

        it('should return status 500 on error', async () => {
            const error = new Error('Database error');
            DenahGedung.findAll.mockRejectedValue(error);

            await DenahGedungController.getDenahGedungs(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });
    });

    describe('getDenahGedungbyId', () => {
        it('should return DenahGedung and Cctvroom with status 200', async () => {
            const denahGedung = { id: 1, nama_gedung: 'Gedung1' };
            const cctvrooms = [{ id: 1, nama: 'CCTV1' }];
            DenahGedung.findOne.mockResolvedValue(denahGedung);
            cctvroom.findAll.mockResolvedValue(cctvrooms);

            req.params = { id: 1 };
            await DenahGedungController.getDenahGedungbyId(req, res);

            expect(res.render).toHaveBeenCalledWith('cctvgedung', { denahGedung, cctvroom: cctvrooms });
        });

        it('should return status 404 if DenahGedung or Cctvroom not found', async () => {
            DenahGedung.findOne.mockResolvedValue(null);
            cctvroom.findAll.mockResolvedValue([]);

            req.params = { id: 1 };
            await DenahGedungController.getDenahGedungbyId(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'denah gedung not found' });
        });

        it('should return status 500 on error', async () => {
            const error = new Error('Database error');
            DenahGedung.findOne.mockRejectedValue(error);

            req.params = { id: 1 };
            await DenahGedungController.getDenahGedungbyId(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });
    });

    describe('addDenahGedung', () => {
        it('should return 201 and the created DenahGedung', async () => {
            const newDenahGedung = { id: 1, nama_gedung: 'Gedung1' };
            req.body = { url1: 'url1', url2: 'url2', url3: 'url3', url4: 'url4', url5: 'url5', url6: 'url6', nama_gedung: 'Gedung1', CctvId: 1 };
            DenahGedung.create.mockResolvedValue(newDenahGedung);

            await DenahGedungController.addDenahGedung(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(newDenahGedung);
        });

        it('should return status 500 on error', async () => {
            const error = new Error('Database error');
            DenahGedung.create.mockRejectedValue(error);

            req.body = { url1: 'url1', url2: 'url2', url3: 'url3', url4: 'url4', url5: 'url5', url6: 'url6', nama_gedung: 'Gedung1', CctvId: 1 };
            await DenahGedungController.addDenahGedung(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });
    });

    describe('updateDenahGedung', () => {
        it('should return 200 and the updated DenahGedung', async () => {
            req.params = { id: 1 };
            req.body = { url1: 'url1', url2: 'url2', url3: 'url3', url4: 'url4', url5: 'url5', url6: 'url6', nama_gedung: 'Gedung1', CctvId: 1 };
            DenahGedung.update.mockResolvedValue([1]);

            await DenahGedungController.updateDenahGedung(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'denah gedung updated' });
        });

        it('should return status 500 on error', async () => {
            const error = new Error('Database error');
            DenahGedung.update.mockRejectedValue(error);

            req.params = { id: 1 };
            req.body = { url1: 'url1', url2: 'url2', url3: 'url3', url4: 'url4', url5: 'url5', url6: 'url6', nama_gedung: 'Gedung1', CctvId: 1 };
            await DenahGedungController.updateDenahGedung(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });
    });

    describe('deleteDenahGedung', () => {
        it('should return 200 and the deleted DenahGedung', async () => {
            req.params = { id: 1 };
            DenahGedung.destroy.mockResolvedValue(1);

            await DenahGedungController.deleteDenahGedung(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'denah gedung deleted' });
        });

        it('should return status 500 on error', async () => {
            const error = new Error('Database error');
            DenahGedung.destroy.mockRejectedValue(error);

            req.params = { id: 1 };
            await DenahGedungController.deleteDenahGedung(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });
    });

    describe('addcctvroom', () => {
        it('should return 201 and the created cctvroom', async () => {
            const newCctvroom = { id: 1, nama: 'CCTV1' };
            req.body = { content: 'content', nama: 'CCTV1', url: 'url', x: 'x', y: 'y', lantai: 'lantai', CctvId: 1 };
            cctvroom.create.mockResolvedValue(newCctvroom);

            await DenahGedungController.addcctvroom(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(newCctvroom);
        });

        it('should return status 500 on error', async () => {
            const error = new Error('Database error');
            cctvroom.create.mockRejectedValue(error);

            req.body = { content: 'content', nama: 'CCTV1', url: 'url', x: 'x', y: 'y', lantai: 'lantai', CctvId: 1 };
            await DenahGedungController.addcctvroom(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });
    });

    describe('getCctvRoombyId', () => {
        it('should return cctvroom with status 200', async () => {
            const cctvrooms = [{ id: 1, nama: 'CCTV1' }];
            cctvroom.findAll.mockResolvedValue(cctvrooms);

            req.params = { id: 1 };
            await DenahGedungController.getCctvRoombyId(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(cctvrooms);
        });

        it('should return status 500 on error', async () => {
            const error = new Error('Database error');
            cctvroom.findAll.mockRejectedValue(error);

            req.params = { id: 1 };
            await DenahGedungController.getCctvRoombyId(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });
    });

    describe('updatecctvroom', () => {
        it('should return 200 and the updated cctvroom', async () => {
            req.params = { id: 1 };
            req.body = { content: 'content', nama: 'CCTV1', url: 'url', x: 'x', y: 'y', lantai: 'lantai', CctvId: 1 };
            cctvroom.update.mockResolvedValue([1]);

            await DenahGedungController.updatecctvroom(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'cctvroom updated' });
        });

        it('should return status 500 on error', async () => {
            const error = new Error('Database error');
            cctvroom.update.mockRejectedValue(error);

            req.params = { id: 1 };
            req.body = { content: 'content', nama: 'CCTV1', url: 'url', x: 'x', y: 'y', lantai: 'lantai', CctvId: 1 };
            await DenahGedungController.updatecctvroom(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });
    });

    describe('deletecctvroom', () => {
        it('should return 200 and the deleted cctvroom', async () => {
            req.params = { id: 1 };
            cctvroom.destroy.mockResolvedValue(1);

            await DenahGedungController.deletecctvroom(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'cctvroom deleted' });
        });

        it('should return status 500 on error', async () => {
            const error = new Error('Database error');
            cctvroom.destroy.mockRejectedValue(error);

            req.params = { id: 1 };
            await DenahGedungController.deletecctvroom(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        });
    });
});