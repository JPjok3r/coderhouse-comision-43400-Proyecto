import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.MONGO_URI;

mongoose.connect(URI)
.then(()=>console.log('Conectado a la base de datos'))
.catch(error=>console.log(error))