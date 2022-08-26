const {Router} = require('express');
//const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validateFields')

const {postGroup, getGroup} = require('../controllers/groupController')


const router = Router();

router.post('/',[validarCampos],postGroup)
router.get('/',getGroup)




module.exports= router;    