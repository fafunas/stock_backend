const {Router} = require('express');
//const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validateFields')

const {getRoles, postRole} = require('../controllers/roleController')
const {verifyToken, isAdmin} = require ('../middlewares/authentication')


const router = Router();

router.post('/',[validarCampos,verifyToken,isAdmin],postRole)
router.get('/',[verifyToken],getRoles)




module.exports= router;    