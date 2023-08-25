import { cartModel } from "../db/models/cart.model.js";

class CartsMongo{
    async findAll(){
        try {
            const carts = await cartModel.find({});
            return carts;
        } catch (error) {
            return error;
        }
    }

    async createCart(){
        try {
            const products = [];
            const newCart = await cartModel.create({products});
            return newCart;
        } catch (error) {
            return error;
        }
    }

    async findById(id){
        try {
            const cart = await cartModel.findById(id);
            return cart;
        } catch (error) {
            return error;
        }
    }

    async addProductToCart(idCart, idProduct){
        try {
            const cart = await this.findById(idCart);
            let id = idCart;
            console.log(idCart, idProduct);
            if(!cart){
                return "ID del carrito no existe";
            }
            const products = cart.products;
            console.log(products);
            if(products.lenght === 0){
                products.push({product:idProduct, quantity: 1});
            } else{
                let jAux = products.findIndex(p=>p.product===idProduct);
                jAux !== -1 ?  products[jAux].quantity++ : products.push({product: idProduct, quantity: 1});
            }
            console.log(products)
            const response = await cartModel.updateOne({_id:id},{products});
            return response;
        } catch (error) {
            return error;
        }
    }
}

export const cartsMongo = new CartsMongo();