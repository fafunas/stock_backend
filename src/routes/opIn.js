const {Router} = require('express');

const {validarCampos} = require('../middlewares/validateFields')

const {opInPost,opInGet} = require('../controllers/opInController')
const {verifyToken, isAdmin} = require ('../middlewares/authentication')

const router = Router();


router.post('/',[verifyToken],opInPost);
router.get('/',[verifyToken],opInGet)

module.exports= router;