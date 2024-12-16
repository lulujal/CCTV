const router = require('express').Router();
const {authentication} = require('../middlewares/authentication');
const AdminController = require('../controllers/AdminController');
const cctvController = require('../controllers/cctvController');
const DenahGedungController = require('../controllers/DenahGedungController');
const authorization = require('../middlewares/authorization');

// add admin
router.post('/admin', async (req, res) => {
    try {
        await AdminController.addAdmin(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

// login page
router.get('/login', (req, res) => {
    res.render('index', { loginError: null });
});

router.post('/login', async (req, res) => {
    try {
        const loginResponse = await AdminController.AdminLogin(req, res);

        const { statusCode, body } = loginResponse;

        if (statusCode === 200) {
            res.cookie("access_token", body.access_token, { httpOnly: true });
            return res.redirect('/admin-map');
        } else {
            return res.status(statusCode).json(body);
        }
    } catch (error) {
        console.log('Login error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
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

// map page
router.get('/', async (req, res) => {
    res.render('map-public');
});

// cctv public page
router.get('/cctv-public', async (req, res) => {
    try {
        await cctvController.getCctvPublic(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// get cctvnormal untuk cctvnormal page
router.get('/cctvnormal', function(req, res) {
    var url = decodeURIComponent(req.query.url);
    res.render('cctvnormal', { url: url });
});

// get cctvobjek untuk cctv yolo
router.get('/cctvyolo', function(req, res) {
    var url = decodeURIComponent(req.query.url);
    res.render('cctvyolo', { url: url });
});

router.use(authentication);

// admin map page
router.get('/admin-map', async (req, res) => {
    res.render('map');
});
// get cctv
router.get('/cctv', authorization('superuser', 'E11','digital center'), async (req, res) => {
    try {
        console.log(req.user);
      if (req.user && req.user.role) {
        if (req.user.role === 'superuser') {
          await cctvController.getCctvs(req, res);
        } else if (req.user.role === 'E11') {
          await cctvController.getCctvE11(req, res);
        } else if (req.user.role === 'digital center') {
          await cctvController.getCctvDC(req, res);
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
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

// get superuser page
router.get('/superuser', authorization('superuser'), function(req, res) {
    res.render('superuser_dashboard');
});

// get admin data
router.get('/admin', authorization('superuser'), async (req, res) => {
    try {
        await AdminController.getAdmin(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

// update admin data
router.put('/admin/:id', authorization('superuser'), async (req, res) => {
    try {
        await AdminController.updateAdmin(req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

// delete admin data
router.delete('/admin/:id', authorization('superuser'), async (req, res) => {
    try {
        await AdminController.deleteAdmin(req, res);
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