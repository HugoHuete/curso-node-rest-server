import dotenv from 'dotenv';
import Server from './models/server.js';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

// config por uploading in cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = new Server();
server.listen();
