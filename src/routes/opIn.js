const {Router} = require('express');

const {validarCampos} = require('../middlewares/validateFields')

const {opInPost,opInGet} = require('../controllers/opInController')

const router = Router();


router.post('/',opInPost);
router.get('/',opInGet)

module.exports= router;