import { response } from 'express';
import { isValidObjectId } from 'mongoose';
import { Category, Product, User } from '../models/index.js';

const allowedCollections = ['users', 'categories', 'products', 'roles'];

const searchUser = async (value = '', res = response) => {
    const isMongoID = isValidObjectId(value);

    if (isMongoID) {
        const user = await User.findById(value);
        res.json({
            results: user ? [user] : [],
        });
    }

    const regex = new RegExp(value, 'i');

    const users = await User.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ status: true }],
    });
    res.json({
        results: users,
    });
};

const searchCategory = async (value = '', res = response) => {
    const isMongoID = isValidObjectId(value);

    if (isMongoID) {
        const category = await Category.findById(value);
        res.json({
            results: category ? [category] : [],
        });
    }

    const regex = new RegExp(value, 'i');

    const categories = await Category.find({ name: regex, status: true });
    res.json({
        results: categories,
    });
};

const searchProduct = async (value = '', res = response) => {
    const isMongoID = isValidObjectId(value);

    if (isMongoID) {
        const product = await Product.findById(value);
        res.json({
            results: product ? [product] : [],
        });
    }

    const regex = new RegExp(value, 'i');

    const products = await Product.find({ name: regex, status: true });
    res.json({
        results: products,
    });
};

const search = (req, res = response) => {
    const { collection, value } = req.params;

    if (!allowedCollections.includes(collection)) {
        return res.status(400).json({
            msg: `Las collecciones permitidas son: ${allowedCollections}`,
        });
    }

    switch (collection) {
        case 'users':
            searchUser(value, res);
            break;
        case 'categories':
            searchCategory(value, res);
            break;
        case 'products':
            break;
        case 'roles':
            break;
        default:
            res.status(500).json('Esto todavia no esta implementado.');
            break;
    }
};


export {search}