import { Schema, model } from 'mongoose';

const roleSchema = Schema({
    role: {
        type:String,
        required: [true, 'El rol es obligatorio.']
    }
})


export const Role = model('role', roleSchema);