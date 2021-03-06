const {Router} = require('express');
const {check} = require('express-validator');


const {usersPut,usersDelete,usersGet,usersPatch,usersPost} = require('../controllers/users')
const {validarCampos} = require('../middlewares/validateFields')
const {userExist} = require('../helpers/validators')


const router = Router();

router.get('/',usersGet);


//Con el check validamos, primer argumento es el campo del body a validar, segundo argumento el mensaje
router.post('/',[
    check('email','El correo no es valido').isEmail(),
    check('name','El correo no es valido').not().isEmpty(),
    validarCampos
] ,usersPost);
 

router.put('/:id',[
    check('id','Not valid ID').isMongoId(),
    check('id').custom(userExist), //Revisar no funciona el findbyid
    validarCampos
], usersPut)


router.delete('/:id', usersDelete)


module.exports = router;