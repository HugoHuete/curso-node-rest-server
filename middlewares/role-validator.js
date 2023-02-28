import { request, response } from 'express';

export const hasAdminRole = (req = request, res = response, next) => {
    if (!req.authUser) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero.',
        });
    }

    const { role, name } = req.authUser;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} no es administrador - No puede hacer esto.`,
        });
    }

    next();
};

export const hasRole = (...roles) => {
    return (req, res = response, next) => {
        if (!req.authUser) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero.',
            });
        }

        if (!roles.includes(req.authUser.role)) {
            return res.status(401).json({
                msg: 'No tiene autorización para ejecutar esa acción.',
            });
        }
        next();
    };
};
