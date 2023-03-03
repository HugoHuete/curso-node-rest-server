import express from 'express';
import cors from 'cors';

import { dbConnection } from '../database/config.js';
import {
    userRouter,
    authRouter,
    categoriesRouter,
    productsRouter,
    searchRouter,
} from '../routes/index.js';


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.paths = {
            auth: '/api/auth',
            categories: '/api/categories',
            products: '/api/products',
            search: '/api/search',
            users: '/api/users',
        };

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio Público
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.paths.auth, authRouter);
        this.app.use(this.paths.categories, categoriesRouter);
        this.app.use(this.paths.products, productsRouter);
        this.app.use(this.paths.search, searchRouter);
        this.app.use(this.paths.users, userRouter);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

export default Server;
