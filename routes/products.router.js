import { Router } from 'express';
import { check } from 'express-validator';
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    updateProduct,
} from '../controllers/products.js';
import { categoryIdExists, productIdExists } from '../helpers/db-validators.js';
import { fieldValidator, hasRole, jwtValidator } from '../middlewares/index.js';

export const router = Router();

// Obtener todas los productos - publico
router.get('/', getAllProducts);

// Crear un producto  - privado con token
router.post(
    '/',
    [
        jwtValidator,
        check('name', 'El nombre es requerido').isString(),
        check('price', 'El precio tiene que ser un numero.').isNumeric(),
        check('category', 'El id de la categoria no es valido')
            .isMongoId()
            .custom(categoryIdExists)
            .withMessage('La categoria no existe.'),
        check('description', 'La descripcion debe ser un string.').optional().isString(),
        fieldValidator,
    ],
    createProduct
);

// Obtener un producto por id - publico
router.get(
    '/:id',
    [
        check('id', 'ID invalido').isMongoId().custom(productIdExists),
        fieldValidator,
    ],
    getProductById
);

// Actualizar una categoria  - privado con token
router.put(
    '/:id',
    [
        jwtValidator,
        check('id', 'ID invalido').isMongoId().custom(productIdExists),
        check('name', 'El nombre tiene que ser un string')
            .optional()
            .isString(),
        check('price', 'El precio tiene que ser un numero.')
            .optional()
            .isNumeric(),
        check('category', 'El id de la categoria no es valido')
            .optional()
            .isMongoId()
            .custom(categoryIdExists)
            .withMessage('La categoria no existe.'),
        fieldValidator,
    ],
    updateProduct
);

// Borrar un producto - Admin
router.delete(
    '/:id',
    [
        jwtValidator,
        hasRole('ADMIN_ROLE'),
        check('id').custom(productIdExists),
        fieldValidator,
    ],
    deleteProduct
);
