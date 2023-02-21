const {Router} = require('express')
const { loginController, registerController, logoutController } = require('../controllers/session.controllers');
const passport = require('../middlewares/passport.middleware')

const router = Router()

//Session routes

router.post('/login',
passport.authenticate('login', {failureRedirect: 'loginerror'}),
(req, res) => {
    if(!req.user) {
        return res.status(400).json({ status: 'error', error: 'wrong user or password'})
    }
    const sessionUser = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
        admin: req.user.admin
    };
    req.session.user = sessionUser
    res.redirect('/profile');
}
);

router.post('/register',
passport.authenticate('register',{failureRedirect:'/registererror '} ),
(req, res) => {
    const sessionUser = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
        admin: req.user.admin
    };
    
    req.session.user = sessionUser
    res.redirect('/profile')
}
);

//Github
router.get('/github', passport.authenticate('github', { scope: ['user : email'] }))

router.get('/github/callback',
passport.authenticate('github', {failureRedirect: '/github-error'}),
async(req, res) => {
    const sessionUser = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
        //admin: req.user.admin
    };
    req.session.user = sessionUser
    res.redirect('/profile')
}
)

//Log out
router.get('/logout', logoutController)

module.exports = router