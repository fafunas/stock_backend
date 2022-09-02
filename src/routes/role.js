const {Router} = require('express');
//const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validateFields')

const {getRoles, postRole} = require('../controllers/roleController')


const router = Router();

router.post('/',[validarCampos],postRole)
router.get('/',getRoles)




module.exports= router;    