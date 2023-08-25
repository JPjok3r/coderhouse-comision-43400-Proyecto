import mongoose from "mongoose";


const URI = MONGO_URI 

mongoose.connect(URI)
.then(()=>console.log('Conectado a la base de datos'))
.catch(error=>console.log(error))