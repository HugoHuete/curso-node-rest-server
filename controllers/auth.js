import { response } from 'express';
import bcryptjs from 'bcryptjs';
import { User } from '../models/user.model.js';
import { generateJWT } from '../helpers/generate-jwt.js';

export const login = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        // Check if email exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: `El correo '${email}' no existe.`,
            });
        }

        // Check if user is active
        if (!user.status) {
            return res.status(400).json({
                msg: `El usuario '${email}' está inactivo.`,
            });
        }

        // Check password
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: `La contraseña es errónea.`,
            });
        }

        // Generatae jwt
        const token = await generateJWT(user.id);

        res.json({
            user,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Oops. Algo salió mal.',
        });
    }
};
