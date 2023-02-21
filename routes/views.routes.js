const {Router} = require('express')
const { auth } = require('../middlewares/auth.middleware');
const { sessionMiddleware } = require('../middlewares/session.middleware');
const router = Router()

//Rutas con vistas

router.get('/', sessionMiddleware, (req, res) => {
    res.render('login');
  });

  router.get('/register', sessionMiddleware, (req, res) => {
    res.render('register');
  });

  router.get('/profile', auth, async (req, res) => {
    const user = await req.session.user
    res.render('profile', { user });
  });

 /* router.get('/products', auth, (req, res) => {
    const user = req.user;
    res.render('products', { user });
  });*/

module.exports = router