import { response } from 'express';
import bcryptjs from 'bcryptjs';
import { User } from '../models/user.model.js';
import { generateJWT } from '../helpers/generate-jwt.js';
import { googleTokenVerify } from '../helpers/google-token-verify.js';

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

export const googleSignIn = async (req, res = response) => {
    const { id_token } = req.body;

    try {
        const { name, image, email } = await googleTokenVerify(id_token);

        let user = await User.findOne({ email });
        if (!user) {
            // Create user
            const data = {
                name,
                email,
                image,
                password: ':P',
                google: true,
                role: 'USER_ROLE',
            };

            user = new User(data);
            await user.save();
        }
        if (!user.status) {
            return res.status(401).json({
                msg: 'Usuario bloqueado.',
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
        res.status(400).json({
            msg: 'Token no se pudo verificar',
        });
    }
};
