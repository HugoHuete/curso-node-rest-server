import { Router } from 'express';
import { check } from 'express-validator';

import { fieldValidator } from '../middlewares/field-validator.js';
import {
    emailExists,
    isValidRole,
    userIdExists,
} from '../helpers/db-validators.js';
import {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,
} from '../controllers/user.js';

const router = Router();

router.get('/', usuariosGet);

router.put(
    '/:id',
    [
        check('id', 'No es un ID válido').isMongoId().custom(userIdExists),
        check('role').custom(isValidRole),
        fieldValidator,
    ],
    usuariosPut
);

router.post(
    '/',
    [
        check('name', 'El nombre es requerido.').not().isEmpty(),
        check(
            'password',
            'La contraseña debe contener al menos 6 caracteres.'
        ).isLength({ min: 6 }),
        check('email', 'El correo no es válido.').isEmail().custom(emailExists),
        check('role').custom(isValidRole),
        fieldValidator,
    ],
    usuariosPost
);

router.delete(
    '/:id',
    [
        check('id', 'No es un ID válido').isMongoId().custom(userIdExists),
        fieldValidator,
    ],
    usuariosDelete
);

router.patch('/', usuariosPatch);

export default router;
