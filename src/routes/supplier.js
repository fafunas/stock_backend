const {Router} = require('express');

const {validarCampos} = require('../middlewares/validateFields')

const {supplierGet, supplierPost} = require ('../controllers/supplierController');
const {verifyToken, isAdmin} = require ('../middlewares/authentication')

const router = Router();

router.post('/',[validarCampos, verifyToken,isAdmin], supplierPost);

router.get('/',[verifyToken],supplierGet);

module.exports = router