const { Cctv } = require('../models')
class cctvController {
        static async getCctvs(req, res) {
        try {
            const cctvs = await Cctv.findAll();
            res.status(200).json(cctvs);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    static getCctvE11(req, res) {
        Cctv.findAll({
            where: {
                access: 'E11'
            }
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({message: err.message})
            })
    }

    static getCctvDC(req, res) {
        Cctv.findAll({
            where: {
                access: 'digital center'
            }
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({message: err.message})
            })
    }

    static getCctvPublic(req, res) {
        Cctv.findAll({
            where: {
                access: ['public', 'digital center']
            }
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({message: err.message})
            })
    }

    static addCctv(req, res) {
        const { content, nama, type, url, lat, lng, access } = req.body;
        Cctv.create({
            content,
            nama,
            type,
            url,
            lat,
            lng,
            access
        })
        .then((result) => {
            let response = {
                id: result.id,
                content: result.content,
                nama: result.nama,
                type: result.type,
                url: result.url,
                lat: result.lat,
                lng: result.lng,
                access: result.access,
                createdAt: result.createdAt,
                updatedAt: result.updatedAt   
            };
            res.status(201).json(response);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
    }

    static updateCctv(req, res) {
        const { id } = req.params;
        const { content, nama, type, url, lat, lng, access } = req.body;
        Cctv.update(
            { content, nama, type, url, lat, lng, access },
            { where: { id }, returning: true }
        )
        .then(([rowsUpdate, [updatedCctv]]) => {
            if (rowsUpdate === 0) {
                return res.status(404).json({ message: 'CCTV not found' });
            }
            res.status(200).json(updatedCctv);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
    }

    static deletecctv(req, res) {
        try{
            const id = req.params.id
            Cctv.destroy({
                where: {
                    id: id
                }
            })
            .then((result) => {
                res.status(200).json({message: 'cctv deleted'})
            })
        }catch(err){
            console.log(err);
            res.status(500).json({message: err.message})
        }
    }
}
module.exports = cctvController