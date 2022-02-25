const express = require('express');
const app = express();
let router = express.Router();
const { auth } = require('../Middleware/authMiddleware');
const {login, register} = require('../Controller/AuthController');
const {registervali, loginvali} = require('../Validation/AuthValidation');
const { passport } = require('../Config/passports');

//Auth route
router.post('/login',loginvali,passport.authenticate('local'),login);
router.post('/register',registervali,register,passport.authenticate('local'),(req, res)=>{
    res.json(req.user).status(200);
});

router.get('/user',passport.authenticate('local'), (req, res)=>{
    res.json(req.user).status(200);
});

router.post('/logout',passport.authenticate('local'), (req, res)=>{
    req.logout();
    res.json("logouted Out").status(200);
});

let api = router;
module.exports = api;