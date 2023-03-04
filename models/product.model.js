import { Schema, model } from 'mongoose';

const productSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio.'],
        unique: true,
    },
    status: {
        type: Boolean,
        default: true,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    price: {
        type: Number,
        default: 0,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true,
    },
    description: {
        type: String,
    },
    available: {
        type: Boolean,
        default: true,
    },
    image: {
        type: String,
    },
});

productSchema.methods.toJSON = function () {
    const { __v, ...product } = this.toObject();
    return product;
};

export const Product = model('product', productSchema);
