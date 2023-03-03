import { Schema, model } from 'mongoose';

const categorySchema = Schema({
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
});

categorySchema.methods.toJSON = function () {
    const { __v,...category } = this.toObject();
    return category;
};

export const Category = model('category', categorySchema);
