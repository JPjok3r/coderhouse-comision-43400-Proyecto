import { productModel } from "../db/models/product.model.js";

class ProductsMongo {

    async findAll(){
        try {
            const products = await productModel.find({});
            return products;
        } catch (error) {
            return error;
        }
    }

    async createOne(obj){
        try {
            const newProduct = await productModel.create(obj);
            return newProduct;
        } catch (error) {
            return error;
        }
    }

    async findById(id){
        try {
            const product = await productModel.findById(id);
            return product;
        } catch (error) {
            return error;
        }
    }

    async updateOne(id, obj){
        try {
            const prodUpdated = await productModel.updateOne({_id:id},{...obj});
            return prodUpdated
        } catch (error) {
            return error;
        }
    }

    async deleteOne(id){
        try {
            const prodDeleted = await productModel.findByIdAndDelete(id);
            return prodDeleted
        } catch (error) {
            return error;
        }
    }
}

export const productsMongo = new ProductsMongo();