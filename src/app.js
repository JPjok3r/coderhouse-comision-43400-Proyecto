import express from "express";
import productRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import handlebars from 'express-handlebars';
import { Server } from "socket.io";
import { __dirname } from "./utils.js";
import { chatMongo } from "./dao/mongoManagers/ChatMongo.js";
import "./dao/db/dbConfig.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/api/products", productRouter);
app.use("/api/carts", cartsRouter);
app.use('/', viewsRouter);

const httpServer = app.listen(8080, () => {
  console.log("Servidor en linea, escuchando en: 8080");
});

const socketServer = new Server(httpServer);

socketServer.on('connection',socket=>{
   console.log(`Usuario conectado: ${socket.id}`);

   socket.on('disconnect',()=>{
       console.log(`Usuario desconectado: ${socket.id}`);
   })

   socket.on('mensaje',async infoMensaje=>{
       await chatMongo.createOne(infoMensaje)
       const messages = await chatMongo.findAll();
       socketServer.emit('chat', messages)
   })
   socket.on('usuarioNuevo',usuario=>{
     socket.broadcast.emit('broadcast',usuario)  
   })

})