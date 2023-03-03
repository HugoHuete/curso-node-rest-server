import { response } from 'express';
import { Category } from '../models/index.js';

const getAllCategories = async (req, res = response) => {
    const { limit = 5, offset = 0 } = req.query;

    const [total, categories] = await Promise.all([
        Category.countDocuments({ status: true }),
        Category.find({ status: true })
            .populate('user')
            .skip(offset)
            .limit(limit),
    ]);

    res.json({ total, categories });
};

const createCategory = async (req, res = response) => {
    const name = req.body.name.toUpperCase();

    let category = await Category.findOne({ name });
    if (category) {
        return res.status(400).json({
            msg: `La categoría '${category.name}' ya exite`,
        });
    }

    const data = {
        name,
        user: req.authUser._id,
    };

    category = new Category(data);
    await category.save();

    res.status(201).json(category);
};

const getCategoryById = async (req, res = response) => {
    const { id } = req.params;
    const category = await Category.findById(id).populate('user');

    res.json(category);
};

const updateCategory = async (req, res = response) => {
    const { id } = req.params;
    let { name } = req.body;

    name = name.toUpperCase();

    const nameExists = await Category.findOne({ name });

    if (nameExists) {
        return res.status(400).json({
            msg: `La categoría "${name}" ya existe`,
        });
    }

    await Category.findByIdAndUpdate(id, { name });
    res.json(id);
};

const deleteCategory = async (req, res = response) => {
    const { id } = req.params;

    await Category.findByIdAndUpdate(id, { status: false });
    res.json(id);
};

export {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
};
