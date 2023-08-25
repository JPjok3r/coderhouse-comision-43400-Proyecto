import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    status: {
        type: Boolean,
    },
    thumbnails: [
        {type: String}
    ]
});

export const productModel = mongoose.model('Products', productSchema);