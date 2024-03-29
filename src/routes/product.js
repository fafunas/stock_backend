const {Router} = require('express');

const {validarCampos} = require('../middlewares/validateFields')

const {totalMovements,productPost,productGet,productPut, getProductByID, productLimitCount, getProductslessStock,getProductsSameStock,getProductsMoreStock} = require('../controllers/productController')
const {verifyToken, isAdmin} = require ('../middlewares/authentication')

const router = Router();

router.get('/dashboard',[verifyToken], productLimitCount);
router.get('/dashboard/less',[verifyToken], getProductslessStock);
router.get('/dashboard/same',[verifyToken], getProductsSameStock);
router.get('/dashboard/greater',[verifyToken], getProductsMoreStock);
router.get('/dashboard/movements',[verifyToken], totalMovements);
router.get('/',[verifyToken],productGet);
router.post('/',[validarCampos,verifyToken],productPost);
router.put('/:id',[validarCampos,verifyToken],productPut);
router.get('/:id',[validarCampos,verifyToken,isAdmin],getProductByID);

module.exports= router;