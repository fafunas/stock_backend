const {Router} = require('express');

const {validarCampos} = require('../middlewares/validateFields')

const {productPost,productGet} = require('../controllers/productController')

const router = Router();

router.get('/',productGet);

router.post('/',[validarCampos],productPost)


module.exports= router;