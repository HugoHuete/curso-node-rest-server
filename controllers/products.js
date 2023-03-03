import { response } from 'express';
import { Product } from '../models/index.js';

const getAllProducts = async (req, res = response) => {
    const { limit = 5, offset = 0 } = req.query;

    const [total, products] = await Promise.all([
        Product.countDocuments({ status: true }),
        Product.find({ status: true })
            .populate('user', 'name')
            .populate('category', 'name')
            .skip(offset)
            .limit(limit),
    ]);

    res.json({ total, products });
};

const createProduct = async (req, res = response) => {
    const { status, user, ...data } = req.body;
    data.name = data.name.toUpperCase();

    let product = await Product.findOne({ name: data.name });

    if (product) {
        return res.status(400).json({
            msg: `El producto '${product.name}' ya exite`,
        });
    }

    data.user = req.authUser._id;

    product = new Product(data);
    await product.save();

    res.status(201).json(product);
};

const getProductById = async (req, res = response) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate('user category');

    res.json(product);
};

const updateProduct = async (req, res = response) => {
    const { id } = req.params;
    const { status, name, ...data } = req.body;

    if (name) {
        const upperName = name.toUpperCase();
        const nameExists = await Product.findOne({name:upperName})
        if(nameExists) {
            return res.status(400).json({
                msg:`El producto "${name}" ya existe.`
            })
        }
        data.name = upperName
    }

    const product = await Product.findByIdAndUpdate(id, data);
    res.json(product);
};

const deleteProduct = async (req, res = response) => {
    const { id } = req.params;

    await Product.findByIdAndUpdate(id, {status:false});
    res.json(id);
};

export {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
