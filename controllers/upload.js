import path from 'path';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import { response } from 'express';
import { upload } from '../helpers/upload-file.js';
import { User, Product } from '../models/index.js';
import __dirname from '../helpers/dirname.js';

const getFile = async (req, res = response) => {
    const { collection, id } = req.params;

    let model;
    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res
                    .status(400)
                    .json({ msg: `No existe el usuario ${id}` });
            }
            break;
        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res
                    .status(400)
                    .json({ msg: `No existe el producto ${id}` });
            }
            break;
        default:
            return res.status(500).json({ msg: 'esto no esta implementado' });
    }

    // Limpiar imagen previa (si hubiera)
    if (model.image) {
        // borrar imagen del servidor
        const imagePath = path.join(
            __dirname,
            '../uploads',
            collection,
            model.image
        );
        if (fs.existsSync(imagePath)) {
            return res.sendFile(imagePath);
        }
    }

    const noFileFoundImage = path.join(__dirname, '../assets/no-image.jpg');
    res.sendFile(noFileFoundImage);
};

const uploadFile = async (req, res = response) => {
    // Intentar subir el archivo
    console.log('uploadpath: ' + __dirname);
    try {
        const tempName = await upload(req.files);
        res.json({ msg: tempName });
    } catch (error) {
        res.status(400).json({ msg: error });
    }
};

const updateFile = async (req, res = response) => {
    const { collection, id } = req.params;

    let model;
    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res
                    .status(400)
                    .json({ msg: `No existe el usuario ${id}` });
            }
            break;
        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res
                    .status(400)
                    .json({ msg: `No existe el producto ${id}` });
            }
            break;
        default:
            return res.status(500).json({ msg: 'esto no esta implementado' });
    }

    // Limpiar imagen previa (si hubiera)
    if (model.image) {
        // borrar imagen del servidor
        const imagePath = path.join(
            __dirname,
            '../uploads',
            collection,
            model.image
        );
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
    }

    const filename = await upload(req.files, undefined, collection);
    model.image = filename;
    await model.save();

    res.json(model);
};

const updateFileCloudinary = async (req, res = response) => {
    const { collection, id } = req.params;

    let model;
    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res
                    .status(400)
                    .json({ msg: `No existe el usuario ${id}` });
            }
            break;
        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return res
                    .status(400)
                    .json({ msg: `No existe el producto ${id}` });
            }
            break;
        default:
            return res.status(500).json({ msg: 'esto no esta implementado' });
    }

    // Limpiar imagen previa (si hubiera)
    if (model.image) {
        // borrar imagen del servidor
        const urlArr = model.image.split('/');
        const imageName = urlArr[urlArr.length - 1];
        const [public_id, ] = imageName.split('.')
        cloudinary.uploader.destroy(public_id)

    }
    // subir imagen a cloudinary
    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    model.image = secure_url;
    await model.save();

    res.json(model);
};

export { uploadFile, updateFile, getFile, updateFileCloudinary };
