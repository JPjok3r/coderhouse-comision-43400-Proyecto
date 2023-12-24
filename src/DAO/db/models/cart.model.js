import mongoose from "mongoose";

const prodRefSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product',
    },
    quantity: {
        type: Number,
    }
});

const cartSchema = new mongoose.Schema({
  
  products: [ prodRefSchema ],
});

export const cartModel = mongoose.model('Carts', cartSchema);
