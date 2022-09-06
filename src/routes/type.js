const {Router} = require('express');
//const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validateFields')

const {postType, getTypes} = require('../controllers/typeController')
const {verifyToken, isAdmin} = require ('../middlewares/authentication')


const router = Router();

router.post('/',[validarCampos,verifyToken],postType)
router.get('/',[verifyToken,isAdmin],getTypes)




module.exports= router;    