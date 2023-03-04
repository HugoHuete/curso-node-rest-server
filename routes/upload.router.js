import { Router } from 'express';
import { check } from 'express-validator';
import { uploadFile, updateFile, getFile, updateFileCloudinary } from '../controllers/upload.js';
import { fieldValidator } from '../middlewares/field-validator.js';
import { uploadFileValidation } from '../middlewares/file-validator.js';

export const router = Router();

router.get(
    '/:collection/:id',
    [
        check('id', 'No es un id válido').isMongoId(),
        check('collection', 'Esa colleccion no está permitida.').isIn([
            'users',
            'products',
        ]),
        fieldValidator,
    ],
    getFile
);


router.post('/', uploadFileValidation, uploadFile);
router.put(
    '/:collection/:id',
    [
        uploadFileValidation,
        check('id', 'No es un id válido').isMongoId(),
        check('collection', 'Esa colleccion no está permitida.').isIn([
            'users',
            'products',
        ]),
        fieldValidator,
    ],
    //updateFile,  // upload on local
    updateFileCloudinary // upload on cloudinary
);
