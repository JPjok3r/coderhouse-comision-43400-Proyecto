 import express from 'express';
 import productRouter from './routes/products.router.js';
 import cartsRouter from './routes/carts.router.js';
 import { __dirname } from './utils.js';

 const app = express();

 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));

 app.use('/api/products', productRouter);
 app.use('/api/carts', cartsRouter);

 app.listen(8080, () => {
    console.log('Servidor en linea, escuchando en: 8080');
 });