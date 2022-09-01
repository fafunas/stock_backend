const {Router} = require('express');

const {validarCampos} = require('../middlewares/validateFields')

const {productPost,productGet,productPut, getProductByID} = require('../controllers/productController')

const router = Router();

router.get('/',productGet);

router.post('/',[validarCampos],productPost);

router.put('/:id',[validarCampos],productPut);

router.get('/:id',[validarCampos],getProductByID);


module.exports= router;