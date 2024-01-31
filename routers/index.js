const router = require('express').Router();
const {authentication} = require('../middlewares/authentication');
const AdminController = require('../controllers/AdminController');
const cctvController = require('../controllers/cctvController');
const DenahGedungController = require('../controllers/DenahGedungController');

// login page
router.get('/', async (req, res) => {
    res.render('index');
});
router.post('/', async (req, res) => {
    try {
        await AdminController.AdminLogin(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});
router.use(authentication);

router.get('/map', async (req, res) => {
    res.render('map');
});

router.get('/cctv', async (req, res) => {
    try {
        await cctvController.getCctvs(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

router.get('/cctvnormal', function(req, res) {
    var url = decodeURIComponent(req.query.url);
    res.render('cctvnormal', { url: url });
});

router.get('/cctvgedung/:id', async function(req, res) {
    var id = req.params.id;
    try {
        await DenahGedungController.getDenahGedung(req, res, id);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
})

router.post('/logout', async (req, res) => {
    try {
        await AdminController.AdminLogout(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

module.exports = router;