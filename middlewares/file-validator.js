import { response } from "express";

const uploadFileValidation = (req, res = response, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        res.status(400).json({ msg: 'No files were uploaded. - uploadFileValidation' });
        return;
    }
    next()
};

export {uploadFileValidation}
