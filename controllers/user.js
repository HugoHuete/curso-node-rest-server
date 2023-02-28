import { response, request } from 'express';
import bcryptjs from 'bcryptjs';
import { User } from '../models/user.model.js';

const usuariosGet = async (req = request, res = response) => {
    const { limit = 5, offset = 0 } = req.query;

    const [total, users] = await Promise.all([
        User.countDocuments({ status: true }),
        User.find({ status: true }).skip(offset).limit(limit),
    ]);

    res.json({ total, users });
};

const usuariosPost = async (req, res = response) => {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await user.save();

    res.json(user);
};

const usuariosPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, email, ...userData } = req.body;

    // Check id en DB

    // Encrypt password if exists
    if (password) {
        const salt = bcryptjs.genSaltSync();
        userData.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, userData);

    res.json(id);
};

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch',
    });
};

const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;
    const authedUser = req.authUser

    const user = await User.findByIdAndUpdate(id, { status: false });

    res.json({ user, authedUser });
};

export {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
};
