import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import __dirname from '../helpers/dirname.js';


const upload = (files, validExtensions = ['png', 'jpg'], folder = '') => {
    return new Promise((resolve, reject) => {
        const { file } = files;
        const filename = file.name.split('.');
        const extension = filename[filename.length - 1];

        if (!validExtensions.includes(extension)) {
            return reject(`La extension ${extension} no es permitida.`);
        }

        const tempName = uuidv4() + '.' + extension;

        const uploadPath = path.join(
            __dirname,
            '../uploads/',
            folder,
            tempName
        );

        file.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }
            resolve(tempName);
        });
    });
};

export { upload };
