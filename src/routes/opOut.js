const {Router} = require('express');

const {opOutGet,opOutPost} = require ('../controllers/opOutController');

const router = Router()

router.post('/',opOutPost);
router.get('/', opOutGet);


module.exports = router