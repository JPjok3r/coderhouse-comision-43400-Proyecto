import mongoose from "mongoose";


const URI = 'mongodb+srv://juanJok3r:Z2Ttdh9BvDMmUsrq@cluster0.wbph3er.mongodb.net/ecommerce?retryWrites=true&w=majority';

mongoose.connect(URI)
.then(()=>console.log('Conectado a la base de datos'))
.catch(error=>console.log(error))