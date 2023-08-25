import { Router } from "express";
//import cartManager from '../dao/fileSystem/CartManager.js';
//import productManager from "../dao/fileSystem/ProductManager.js";

import { cartsMongo } from "../dao/mongoManagers/CartsMongo.js";
import { productsMongo } from "../dao/mongoManagers/ProductsMongo.js";

const router = Router();

router.post('/', async (req, res) => {
    try {
        const newCart = await cartsMongo.createCart();
        res.status(200).json({ message:"Cart creado", cart: newCart });
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await cartsMongo.findById(cid);
        if(cart){
            res.status(200).json({ message: `Carrito con identificador: ${cid}`, carrito: cart });
        }
        else{
            res.status(200).json({ message: cart });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const productExist = await productsMongo.findById(pid);
        /* if(typeof productExist !== 'object'){
            res.status(200).json({ message: `Product ${pid}. ${productExist}. No se puede agregar el producto`});
        }
        else{ */
            const msg = await cartsMongo.addProductToCart(cid, pid);
            res.status(200).json({ message: msg});
        //}
    } catch (error) {
        res.status(500).json({ error });
    }
});

export default router;