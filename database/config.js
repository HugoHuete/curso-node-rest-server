import mongoose from 'mongoose';

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        console.error(error);
        throw new Error('Error al iniciar la base de datos');
    }
};
