import { Role } from '../models/role.model.js';
import { User } from '../models/user.model.js';

export const isValidRole = async (role = '') => {
    const roleExists = await Role.findOne({role})
    if (!roleExists) {
        throw new Error(`El rol '${role}' no esta registrado en la base de datos`)
    }
}
export const emailExists = async (email = '') => {
    const emailExists = await User.findOne({email})
    if (emailExists) {
        throw new Error(`El email '${email}' ya existe.`)
    }
}

export const userIdExists = async (id = '') => {
    const idExists = await User.findById(id)
    if (!idExists) {
        throw new Error(`El id '${id}' no existe.`)
    }
}