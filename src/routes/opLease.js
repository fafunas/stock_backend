const {Router} =require ('express');

const {opLeasePost, opLeaseGet,getAll,disableLease,returnLease} = require('../controllers/opLeaseControllers');
const {verifyToken} = require ('../middlewares/authentication')

const router = Router();


router.post('/',[verifyToken],opLeasePost);
router.put('/:id',[verifyToken],disableLease);
router.put('/return/:id',[verifyToken],returnLease);
router.get('/',[verifyToken],opLeaseGet);
router.get('/all',[verifyToken],getAll);

module.exports= router;