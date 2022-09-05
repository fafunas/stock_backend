const {Router} = require('express');
//const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validateFields')

const {postGroup, getGroup} = require('../controllers/groupController')
const {verifyToken, isAdmin} = require ('../middlewares/authentication')


const router = Router();

router.post('/',[validarCampos,verifyToken,isAdmin],postGroup)
router.get('/',[verifyToken],getGroup)




module.exports= router;    