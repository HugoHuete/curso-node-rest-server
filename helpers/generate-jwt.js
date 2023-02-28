import jwt from 'jsonwebtoken';

export const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        const options = {
            expiresIn: '4h',
        };

        jwt.sign(payload, process.env.SECRETKEY, options, (err, token) => {
            if (err) {
                console.error(object);
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
        });
    });
};
