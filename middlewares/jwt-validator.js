import { request, response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

export const jwtValidator = async (req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay ningún token en la petición.',
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETKEY);
        const user = await User.findById(uid);

        if (!user || !user.status) {
            return res.status(401).json({
                msg: 'Token no valido - Usuario no existe o esta inactivado.',
            });
        }
        req.authUser = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({
            msg: 'Token no válido',
        });
    }
};
