import { Router } from 'express';
import { search } from '../controllers/search.js';
// import { check } from 'express-validator';
// import { googleSignIn, login } from '../controllers/auth.js';
// import { fieldValidator } from '../middlewares/field-validator.js';

const router = Router();

router.get('/:collection/:value', search)

export { router };
