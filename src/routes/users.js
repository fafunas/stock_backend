const {Router} = require('express');
const {check} = require('express-validator');


const {usersPut,usersDelete,usersGet,usersPatch,usersPost, allUser} = require('../controllers/users')
const {validarCampos} = require('../middlewares/validateFields')
const {userExist} = require('../helpers/validators')

const {verifyToken, isAdmin} = require ('../middlewares/authentication')


const router = Router();

router.get('/',[verifyToken],usersGet);
router.get('/all',[verifyToken,isAdmin], allUser);


//Con el check validamos, primer argumento es el campo del body a validar, segundo argumento el mensaje
router.post('/',[
    check('email','El correo no es valido').isEmail(),
    check('name','El correo no es valido').not().isEmpty(),
    [verifyToken,isAdmin],
    validarCampos
] ,usersPost);
 

router.put('/:id',[
    check('id','Not valid ID').isMongoId(),
    check('id').custom(userExist),
    [verifyToken,isAdmin],
    validarCampos
], usersPut)


router.delete('/:id',[verifyToken,isAdmin], usersDelete)


module.exports = router;