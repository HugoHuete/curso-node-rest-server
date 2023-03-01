import { Router } from 'express';
import { check } from 'express-validator';
import { googleSignIn, login } from '../controllers/auth.js';
import { fieldValidator } from '../middlewares/field-validator.js';

export const router = Router();

router.post(
    '/login',
    [
        check('email', 'El correo es obligatorio.').isEmail(),
        check('password', 'La contraseña es obligatoria.').not().isEmpty(),
        fieldValidator
    ],
    login
);

router.post(
    '/google',
    [
        check('id_token', 'Token de google es necesario.').not().isEmpty(),
        fieldValidator
    ],
    googleSignIn
);
