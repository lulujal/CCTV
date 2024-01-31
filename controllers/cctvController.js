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
}
module.exports = cctvController