import BasicMongo from "./BasicMongo.js";
import { productModel } from "../db/models/product.model.js";

class ProductsMongo extends BasicMongo{
    constructor() {
        super(productModel)
    }

    async getAllPaginate(obj){
        const { limit, page, sortPrice, lean, ...query } = obj;
        let options;
        if(limit){
            options = { limit, page, sort: { price:sortPrice}, lean}
        } else{
            options = { pagination: false, lean}
        }
        try {
            const rest = await productModel.paginate(query, options);
            const info = {
                status: rest
                    ? "success"
                    : "error",
                payload: rest.docs,
                totalPages: rest.totalPages,
                prevPage: rest.hasPrevPage
                    ? rest.prevPage
                    : null,
                nextPage: rest.hasNextPage
                    ? rest.nextPage
                    : null,
                hasPrevPage: rest.hasPrevPage,
                hasNextPage: rest.hasNextPage,
                prevLink: rest.hasPrevPage
                    ? `http://localhost:8080/api/products?${rest.prevPage}`
                    : null,
                nextLink: rest.hasNextPage
                    ? `http://localhost:8080/api/products?${rest.nextPage}`
                    : null,
            }
            return info;
        } catch (error) {
            return error;
        }
    }
}

export const productsMongo = new ProductsMongo();