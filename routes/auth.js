const {Router} = require('express');
const {check} = require('express-validator');
const { login } = require('../controllers/auth');
const {validarCampos} = require('../middlewares/validateFields')

const router = Router();

router.post('/login',[
    check('email','El mail es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').notEmpty(),
    validarCampos
    
],login);



module.exports= router;