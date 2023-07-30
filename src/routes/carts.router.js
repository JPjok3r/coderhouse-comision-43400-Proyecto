import { Router } from "express";
import cartManager from '../CartManager.js';
import productManager from "../ProductManager.js";

const router = Router();

router.post('/', async (req, res) => {
    try {
        const msg = await cartManager.createCart();
        res.status(200).json({ message:msg });
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await cartManager.getCartById(+cid);
        if(typeof cart === 'object'){
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
        const productExist = await productManager.getProductById(+pid);
        if(typeof productExist !== 'object'){
            res.status(200).json({ message: `Product ${pid}. ${productExist}. No se puede agregar el producto`});
        }
        else{
            const msg = await cartManager.addProductToCart(+cid, +pid);
            res.status(200).json({ message: msg});
        }
    } catch (error) {
        res.status(500).json({ error });
    }
});

export default router;