const { Cctv } = require('../models')
class cctvController {
    static getCctvs(req, res) {
        Cctv.findAll()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
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
                res.status(500).json(err)
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
                res.status(500).json(err)
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
                res.status(500).json(err)
            })
    }

    static addCctv(req, res) {
        try{
            const { content,nama,type,url,lat,lng} = req.body
            Cctv.create({
                content,
                nama,
                type,
                url,
                lat,
                lng
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
                    createdAt: result.createdAt,
                    updatedAt: result.updatedAt,
                }
                res.status(201).json(response)
            })
        }catch(err){
            console.log(err);
            res.status(500).json(err)
        }
    }

    static updateCctv(req, res) {
        try{
            const id = req.params.id
            const { content,nama,type,url,lat,lng} = req.body
            Cctv.update({
                content,
                nama,
                type,
                url,
                lat,
                lng
            },{
                where: {
                    id: id
                },
                returning: true
            })
            .then((result) => {
                res.status(200).json(result[1][0])
            })
        }catch(err){
            console.log(err);
            res.status(500).json(err)
        }
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
            res.status(500).json(err)
        }
    }
}
module.exports = cctvController