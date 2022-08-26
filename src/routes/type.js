const {Router} = require('express');
//const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validateFields')

const {postType, getTypes} = require('../controllers/typeController')


const router = Router();

router.post('/',[validarCampos],postType)
router.get('/',getTypes)




module.exports= router;    