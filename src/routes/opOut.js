const {Router} = require('express');

const {opOutGet,opOutPost} = require ('../controllers/opOutController');
const {verifyToken} = require ('../middlewares/authentication')

const router = Router()

router.post('/',[verifyToken],opOutPost);
router.get('/',[verifyToken], opOutGet);


module.exports = router