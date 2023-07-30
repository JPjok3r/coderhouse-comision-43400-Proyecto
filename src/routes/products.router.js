import { Router } from "express";
import productManager from '../ProductManager.js';

const router = Router();

router.get('/', async (req, res) => {
    const { limit } = req.query;
    try {
        const products = await productManager.getProducts();
        if(limit){
            const prodLimit = products.slice(0, +limit);
            res.status(200).json({message: 'Products', prodLimit});
        } else{
            res.status(200).json({message: 'Products', products});
        }
    } catch (error) {
        res.status(500).json({error});
    }
});

router.get('/:pId', async (req, res) => {
    const { pId } = req.params;
    try {
        const product = await productManager.getProductById(+pId);
        if(typeof product === 'object')
            res.status(200).json({ message: `Product ${pId}`, product});
        else
            res.status(200).json({ message: `Error`, product});
    } catch (error) {
        res.status(500).json({error});
    }
});

router.post('/', async (req, res) => {
    try {
        const {title, description, code, price, status=true, stock, category, thumbnails=[]} = req.body;
        if(title && description && code && price && stock && category){
            const sendData = {
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnails
            }
            const newProduct = await productManager.addProduct(sendData);
            res.json(newProduct);
        } else{
            res.status(400).json({message: 'Error, todos los campos son obligatorios.'})
        }
    } catch (error) {
        res.status(500).json({error});
    }
});

router.put('/:pId', async (req, res) => {
    const { pId } = req.params;
    try {
        const prodUpdated = await productManager.updateProduct(+pId, req.body);
        res.status(200).json({message: prodUpdated});
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.delete('/:pId', async (req, res) => {
    const { pId } = req.params;
    try {
        const resp = await productManager.deleteProduct(+pId);
        res.status(200).json({message: resp});
    } catch (error) {
        res.status(500).json({ error });
    }
});

export default router;