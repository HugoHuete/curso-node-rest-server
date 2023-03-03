import { Role, User, Category, Product } from '../models/index.js';

const isValidRole = async (role = '') => {
    const roleExists = await Role.findOne({ role });
    if (!roleExists) {
        throw new Error(
            `El rol '${role}' no esta registrado en la base de datos`
        );
    }
};
const emailExists = async (email = '') => {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
        throw new Error(`El email '${email}' ya existe.`);
    }
};

const userIdExists = async (id = '') => {
    const idExists = await User.findById(id);
    if (!idExists) {
        throw new Error(`El id '${id}' no existe.`);
    }
};


const categoryIdExists = async (id = '') => {
    let idExists;
    try {
        idExists = await Category.findById(id);
    } catch (error) {
        return;
    }

    if (!idExists) {
        throw new Error(`El id '${id}' no existe.`);
    }
};

const productIdExists = async (id = '') => {
    let idExists;
    try {
        idExists = await Product.findById(id);
    } catch (error) {
        return;
    }

    if (!idExists) {
        throw new Error(`El id '${id}' no existe.`);
    }
};
export { isValidRole, emailExists, userIdExists, categoryIdExists, productIdExists };
