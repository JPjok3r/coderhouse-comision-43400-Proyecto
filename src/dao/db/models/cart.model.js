import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: [ 
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref:"Products"
            },
            quantity:{
                type: Number
            }
        } 
    ]
});

export const cartModel = mongoose.model('Carts', cartSchema);