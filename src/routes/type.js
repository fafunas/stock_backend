const {Router} = require('express');
//const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validateFields')

const {postType} = require('../controllers/typeController')


const router = Router();

router.post('/',[validarCampos],postType)




module.exports= router;    