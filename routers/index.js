const router = require('express').Router();
const {authentication} = require('../middlewares/authentication');
const AdminController = require('../controllers/AdminController');
const cctvController = require('../controllers/cctvController');
const DenahGedungController = require('../controllers/DenahGedungController');

// login page
router.get('/', (req, res) => {
    res.render('index', { loginError: null });
});
router.post('/', async (req, res) => {
    try {
        const access_token = await AdminController.AdminLogin(req, res);
        res.cookie("access_token", access_token);
        res.redirect('/map');
    } catch (error) {
        res.status(401).render('index', { loginError: error.message });
    }
});

// menambahkan cctv
router.post('/cctv', async (req, res) => {
    try {
        await cctvController.addCctv(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

// mengupdate cctv
router.put('/cctv/:id', async (req, res) => {
    try {
        await cctvController.updateCctv(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

// menghapus cctv
router.delete('/cctv/:id', async (req, res) => {
    try {
        await cctvController.deletecctv(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

// get denah gedung
router.get('/cctvgedung', async (req, res) => {
    try {
        await DenahGedungController.getDenahGedungs(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

// get denah gedung by id
router.get('/cctvgedung/:id', async function(req, res) {
    var id = req.params.id;
    try {
        await DenahGedungController.getDenahGedungbyId(req, res, id);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
})

// menambahkan denah gedung
router.post('/cctvgedung', async (req, res) => {
    try {
        await DenahGedungController.addDenahGedung(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

// mengupdate denah gedung
router.put('/cctvgedung/:id', async (req, res) => {
    try {
        await DenahGedungController.updateDenahGedung(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

// menghapus denah gedung
router.delete('/cctvgedung/:id', async (req, res) => {
    try {
        await DenahGedungController.deleteDenahGedung(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

// menambahkan cctv room
router.post('/cctvroom', async (req, res) => {
    try {
        await DenahGedungController.addcctvroom(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

// mendapatkan data cctv room by id
router.get('/cctvroom/:id', async (req, res) => {
    try {
        await DenahGedungController.getCctvRoombyId(req, res); 
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

// mengupdate cctv room
router.put('/cctvroom/:id', async (req, res) => {
    try {
        await DenahGedungController.updatecctvroom(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

// menghapus cctv room
router.delete('/cctvroom/:id', async (req, res) => {
    try {
        await DenahGedungController.deletecctvroom(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

router.use(authentication);

// map page
router.get('/map', async (req, res) => {
    res.render('map');
});

// get cctv
router.get('/cctv', async (req, res) => {
    try {
        await cctvController.getCctvs(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

// get cctvnormal untuk cctvnormal page
router.get('/cctvnormal', function(req, res) {
    var url = decodeURIComponent(req.query.url);
    res.render('cctvnormal', { url: url });
});

// get cctvdashboard untuk cctv_dashboard page
router.get('/cctvdashboard/cctv', async (req, res) => {
    try {
        res.render('cctv_dashboard');
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

// get cctvdashboard untuk cctvgedung_dashboard page
router.get('/cctvdashboard/cctvgedung', async (req, res) => {
    try {
        res.render('cctvgedung_dashboard');
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

// post logout
router.post('/logout', async (req, res) => {
    try {
        await AdminController.AdminLogout(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

module.exports = router;