const {Router} = require('express');

const {validarCampos} = require('../middlewares/validateFields')

const {supplierGet, supplierPost} = require ('../controllers/supplierController');

const router = Router();

router.post('/',[validarCampos], supplierPost);

router.get('/',supplierGet);

module.exports = router