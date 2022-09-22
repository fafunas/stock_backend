const {Router} =require ('express');

const {opLeasePost, opLeaseGet} = require('../controllers/opLeaseControllers');
const {verifyToken} = require ('../middlewares/authentication')

const router = Router();


router.post('/',opLeasePost);
router.get('/',opLeaseGet)

module.exports= router;