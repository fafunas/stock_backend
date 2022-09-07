const {Router} = require('express');
//const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validateFields')

const {getRoles, postRole , getRolByUserId} = require('../controllers/roleController')
const {verifyToken, isAdmin} = require ('../middlewares/authentication')


const router = Router();

router.post('/',[validarCampos,verifyToken,isAdmin],postRole)
router.get('/',[verifyToken],getRoles)
router.post('/rol', getRolByUserId)




module.exports= router;    