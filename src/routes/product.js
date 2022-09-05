const {Router} = require('express');

const {validarCampos} = require('../middlewares/validateFields')

const {productPost,productGet,productPut, getProductByID} = require('../controllers/productController')
const {verifyToken, isAdmin} = require ('../middlewares/authentication')

const router = Router();

router.get('/',[verifyToken],productGet);

router.post('/',[validarCampos,verifyToken,isAdmin],productPost);

router.put('/:id',[validarCampos,verifyToken,isAdmin],productPut);

router.get('/:id',[validarCampos,verifyToken,isAdmin],getProductByID);


module.exports= router;