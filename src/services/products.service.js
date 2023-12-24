import { productsMongo } from "../DAO/managers/ProductsMongo.js";
import transporter from "./mailer/nodemailer.js";

class ProductService{
    async getAll(obj) {
        const resProducts = await productsMongo.getAllPaginate(obj);
        return resProducts;
    }
    
    async getById(id) {
        const resProduct = await productsMongo.getById(id);
        return resProduct;
    }
    
    async create(obj) {
        const response = await productsMongo.createOne(obj);
        return response;
    }
    
    async update(id, obj, email) {
        if (email){
            const prodFinded = await this.getById(id);
            if(prodFinded.owner === email){
                const updatedProd = await productsMongo.updateOne(id, obj);
                return updatedProd;
            } else {
                return "Usted no tiene permiso de modificar este producto";
            }
        }
        const response = await productsMongo.updateOne(id, obj);
        return response;
    }
    
    async deleteProduct(id) {
        //if (email){
            const prodFinded = await this.getById(id);
            if(prodFinded.owner !== "admin"){
                const deletedProd = await productsMongo.deleteOne(id);
                const msgOpt = {
                    from: 'E-commerce CodeHouse',
                    to: prodFinded.owner,
                    subject: 'Producto eliminado',
                    template: 'emailPassReset',
                    context: {
                        product: prodFinded
                    }
                }
                await transporter.sendMail(msgOpt);
                return deletedProd;
            }
            const deletedProd = await productsMongo.deleteOne(id);
            return deletedProd;
        //}
        // const response = await productsMongo.deleteOne(id);
        // return response;
    }
}

export const productService = new ProductService();