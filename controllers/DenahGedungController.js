const {DenahGedung,cctvroom} = require('../models')
class DenahGedungController {
    static async getDenahGedung(req, res) {
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

}
module.exports = DenahGedungController