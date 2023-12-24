import BasicMongo from "./BasicMongo.js";
import { cartModel } from "../db/models/cart.model.js";

class CartsMongo extends BasicMongo{
    constructor(){
        super(cartModel, ['products.id'])
    }

    async #existProductInCart(idCart, idProduct){
        try {
            const exists = await cartModel.findOne({ 
                $and: [
                    {_id:idCart},
                    {products: {$elemMatch: {id:idProduct}}}
                ]});
            if(exists)
                return true;
            else 
                return false;
        } catch (error) {
            return error;
        }
    }

    async addProductToCart(idCart, idProduct, cant){
        try {
            const cart = await this.getById(idCart);
            const qtty = cant || 1;
            if(!cart){
                return "ID del carrito no existe";
            }
            let response;
            await this.#existProductInCart(idCart, idProduct) 
            ? response = await cartModel.updateOne({_id:idCart},{$inc: {"products.$[elem].quantity":qtty}},{arrayFilters:[{ "elem.id": idProduct}]})
            : response = await cartModel.updateOne({_id:idCart},{$push:{products: {id:idProduct, quantity:qtty}}});

            return response;
        } catch (error) {
            return error;
        }
    }

    async deleteProductFromCart(idCart, idProduct){
        try {
            const cart = await this.getById(idCart);
            if(!cart)
                throw new Error('Carrito no encontrado');
            const resp = await cartModel.updateOne({_id:idCart}, {$pull:{products:{id:idProduct}}});
            return resp;
        } catch (error) {
            return error;
        }
    }
}

export const cartsMongo = new CartsMongo();