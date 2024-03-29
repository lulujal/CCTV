const {DenahGedung,cctvroom} = require('../models')
class DenahGedungController {
    static async getDenahGedungs(req, res) {
        try{
            const denahGedung = await DenahGedung.findAll()
            res.status(200).json(denahGedung)
        }catch(error){
            console.log(error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    }

    static async getDenahGedungbyId(req, res) {
        try{
        const id = req.params.id
        const denahGedung = await DenahGedung.findOne({
            where:{
                CctvId: id
            }
        })
        const Cctvroom = await cctvroom.findAll({
            where:{
                CctvId: id
            }
        })
        if (denahGedung && Cctvroom){
            res.render('cctvgedung', { denahGedung: denahGedung , cctvroom: Cctvroom });
        }
        else{
            res.status(404).json({message: 'denah gedung not found'})
        }
    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
    }

    static async addDenahGedung(req, res) {
        try{
            const {url1,url2,url3,url4,url5,url6,nama_gedung,CctvId} = req.body
            const denahGedung = await DenahGedung.create({
                url1,
                url2,
                url3,
                url4,
                url5,
                url6,
                nama_gedung,
                CctvId
            })
            res.status(201).json(denahGedung)
        }catch(error){
            console.log(error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    }

    static async updateDenahGedung(req, res) {
        try{
            const id = req.params.id
            const {url1,url2,url3,url4,url5,url6,nama_gedung,CctvId} = req.body
            await DenahGedung.update({
                url1,
                url2,
                url3,
                url4,
                url5,
                url6,
                nama_gedung,
                CctvId
            },{
                where: {
                    id: id
                },
                returning: true
            })
            res.status(200).json({message: 'denah gedung updated'})
        }catch(error){
            console.log(error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    }

    static async deleteDenahGedung(req, res) {
        try{
            const id = req.params.id
            await DenahGedung.destroy({
                where: {
                    id: id
                }
            })
            res.status(200).json({message: 'denah gedung deleted'})
        }catch(error){
            console.log(error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    }

    static async addcctvroom(req, res) {
        try{
            const {content,nama,url,x,y,lantai,CctvId} = req.body
            const Cctvroom = await cctvroom.create({
                content,
                nama,
                url,
                x,
                y,
                lantai,
                CctvId
            })
            res.status(201).json(Cctvroom)
        }catch(error){
            console.log(error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    }

    static async getCctvRoombyId(req, res) {
        try{
        const id = req.params.id
        const Cctvroom = await cctvroom.findAll({
            where:{
                CctvId: id
            }
        })
        if (Cctvroom){
            res.status(200).json(Cctvroom)
        }
        else{
            res.status(404).json({message: 'cctv room not found'})
        }
    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
    }

    static async updatecctvroom(req, res) {
        try{
            const id = req.params.id
            const {content,nama,url,x,y,lantai,CctvId} = req.body
            await cctvroom.update({
                content,
                nama,
                url,
                x,
                y,
                lantai,
                CctvId
            },{
                where: {
                    id: id
                },
                returning: true
            })
            res.status(200).json({message: 'cctvroom updated'})
        }catch(error){
            console.log(error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    }
    
    static async deletecctvroom(req, res) {
        try{
            const id = req.params.id
            await cctvroom.destroy({
                where: {
                    id: id
                }
            })
            res.status(200).json({message: 'cctvroom deleted'})
        }catch(error){
            console.log(error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    }
}
module.exports = DenahGedungController