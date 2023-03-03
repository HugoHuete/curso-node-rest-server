import { Router } from 'express';
import { check } from 'express-validator';

import { categoryIdExists } from '../helpers/db-validators.js';
import { fieldValidator, hasRole, jwtValidator } from '../middlewares/index.js';
import {
    createCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
} from '../controllers/categories.js';

export const router = Router();

// Obtener todas las categorias - publico
router.get('/', getAllCategories);

// Crear una categoria  - privado con token
router.post(
    '/',
    [
        jwtValidator,
        check('name', 'El nombre es requerido').not().isEmpty(),
        fieldValidator,
    ],
    createCategory
);

// Obtener una por id - publico
router.get(
    '/:id',
    [
        check('id', 'ID invalido').isMongoId().custom(categoryIdExists),
        fieldValidator,
    ],
    getCategoryById
);

// Actualizar una categoria  - privado con token
router.put(
    '/:id',
    [
        jwtValidator,
        check('name', 'El nombre es requerido').not().isEmpty(),
        check('id', 'ID invalido').isMongoId().custom(categoryIdExists),
        fieldValidator,
    ],
    updateCategory
);

// Borrar una categoria  - Admin
router.delete(
    '/:id',
    [
        jwtValidator,
        hasRole('ADMIN_ROLE'),
        check('id').custom(categoryIdExists),
        fieldValidator,
    ],
    deleteCategory
);
