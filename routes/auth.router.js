import { Router } from 'express';
import { check } from 'express-validator';
import { login } from '../controllers/auth.js';
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
