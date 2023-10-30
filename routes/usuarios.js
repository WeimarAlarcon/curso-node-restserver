const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet, 
        usuariosPost, 
        usuariosPut, 
        usuariosPatch, 
        usuariosDelete } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet );

router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe ser más de 6 letras').isLength({ min: 6 }),
        check('correo').custom( existeEmail ),
        // check('correo', 'El correo no es valido').isEmail(),
        // check('rol', 'No es un rol válido').isIn(['USER_ROLE', 'ADMIN_ROLE']),
        check('rol').custom( esRolValido ),
        validarCampos
], usuariosPost );

router.put('/:id', [
        check('id', 'N es ID válido').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        validarCampos
], usuariosPut );

router.patch('/:id', usuariosPatch );

router.delete('/:id', [
        check('id', 'No es ID válido').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        validarCampos
], usuariosDelete );

module.exports = router;
