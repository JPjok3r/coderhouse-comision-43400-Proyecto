import { userService } from "../services/users.service.js";
import config from "../config.js";
import fs from 'fs';
import { __dirname } from "../utils/utils.js";
import { sessionService } from "../services/session.service.js";

class UserController{
    async login(req, res) {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({message: "Debe llenar los datos"});
        }
        if(email === config.admin_mail && password === config.admin_password){
            req.session.user = {
                name: "CoderHouse",
                email: email,
                rol: "admin"
            }
            res.redirect('/administration');
        } else{
            const verifyUser = await userService.getOne(email, password);
            if(verifyUser.userValid){
                if(verifyUser.authorized){
                    req.session.user = {
                        name: `${verifyUser.user.first_name} ${verifyUser.user.last_name}`,
                        email: email,
                        rol: verifyUser.user.role,
                        age: verifyUser.user.age,
                        cart: verifyUser.user.cart
                    }
                    const last_conection = {
                        status: "online",
                        date_time: new Date(Date.now())
                    }
                    await userService.updateUser(verifyUser._id, {last_conection});
                    res.redirect('/products?limit=10');
                } else{
                    res.status(401).json({ message: 'Email or Password no validos' });
                }
            } else{
                res.status(400).json({ message: verifyUser.msg });
            }
        }
    }
    
    async signup(req, res) {
        const { first_name, last_name, email, age, password } = req.body;
        if(!email || !password || !first_name || !last_name || !age){
            return res.status(400).json({message: "Debe llenar los datos"});
        }
        const response = await userService.create(req.body);
        if (response.operationFail){
            return res.status(400).json({ message: response.msg });
        }
        res.status(200).json({message: 'Usuario creado', user:response});
    }

    async deleteUser(req, res){
        const { uid } = req.params;
        try {
            const userDel = await userService.deleteUser(uid);
            if (!userDel){
                return res.status(400).json({ message: 'Usuario no encontrado' });
            }
            const msgSess = req.session.destroy(err => {
                if(err) return res.status(500).json({message: err})
                return "Session destroyed successfully";
            });
            res.status(200).json({message: msgSess, userDeleted: userDel});
        } catch (error) {
            res.status(500).json({message: error});
        }
    }

    async recoverPass(req, res){
        const { email } = req.body;
        if (!email){
            return res.status(400).json({message: "Debe ingresar el correo electronico"});
        }
        const response = await userService.passRecover(email);
        if (response.operationFail){
            return res.status(400).json({ message: response.msg });
        }
        res.status(200).json({message: response.msg, user: response.updUser});
    }

    async resetPass(req, res){
        const { password } = req.body;
        const { id } = req.params;
        if (!password){
            return res.status(400).json({message: "Debe ingresar la contraseña"});
        }
        const userResetPass = await userService.updateUser(id, {password}, true);
        if(userResetPass){
            res.status(200).json({message: 'Contraseña actualizada correctamente', user: userResetPass});
        } else{
            res.status(500).json({message: 'Error al actualizar la contraseña'});
        }
    }

    async changeUserRole(req, res){
        const { uid } = req.params;
        const user = await userService.getById(uid);
        if(user.user.role === "user"){
            //mas controles para poder cambiarle el role
            const identExist = fs.existsSync(__dirname+`/uploads/documents/identificacion-${uid}`);
            const domicilioExist = fs.existsSync(__dirname+`/uploads/documents/comprobantedomicilio-${uid}`);
            const cuentaExist = fs.existsSync(__dirname+`/uploads/documents/comprobantecuenta-${uid}`);
            if(identExist && domicilioExist && cuentaExist){
                const updUser = await userService.updateUser(uid, {role: 'premium'});
                res.status(200).json({message: 'Usted ahora es usario premium', user: updUser});
            } else{
                res.status(401).json({message: 'No se pudo realizar el cambio de rol, faltan documentos'});
            }
        } else{
            const updUser = await userService.updateUser(uid, {role: 'user'});
            res.status(200).json({message: 'Usted ahora es un usuario común', user: updUser});
        }
    }

    async documentsUpload(req, res){
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }
        const { uid } = req.params;
        let documents = [];
        req.files.forEach(elementFile => {
            documents.push({
                name: elementFile.filename,
                reference: "./uploads/documents/"
            })
        });
        const updateUser = await userService.updateUser(uid, {documents: documents});
        res.status(200).json({message: 'Files updated successfully', options: updateUser});
    }

    async getAllUsers(req, res){
        try {
            const users = await userService.getAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({message: 'Ocurrió un error al obtener los usuarios'});
        }
    }

    async deleteInactiveUsers(req, res) {
        try {
            const users = await userService.getAll();
            let usersDeleted = [];
            users.forEach(async (user) => {
                let timeDb = new Date(user.last_conection.date_time);
                let timeNow = new Date(Date.now());
                let validToDelete = false;
                if(timeNow.getDate() - timeDb.getDate() >= 2){
                    validToDelete = true;
                } 
                if(user.last_conection.status === "offline" && validToDelete ){
                    await userService.deleteUser(user._id);
                    usersDeleted.push(user);
                }
            });
            res.status(200).json({message: 'Usuarios eliminados', users: usersDeleted});
        } catch (error) {
            res.status(500).json({message: 'Ocurrió un error al eliminar los usuarios inactivos'});
        }
    }
    
    githubAuth(req, res) {
        req.session.user = {
            name: `${req.user.first_name} ${req.user.last_name}`,
            email: req.user.email,
            rol: req.user.rol,
            cart: req.user.cart
        }
        res.redirect('/products');
    }
    
    googleAuth(req, res) {
        req.session.user = {
            name: `${req.user.first_name} ${req.user.last_name}`,
            email: req.user.email,
            rol: req.user.rol,
            cart: req.user.cart
        } 
        res.redirect('/products');
    }
    
    async logout(req, res) {
        const emailUser = req.session.user.email;
        const user = await sessionService.currentSession(emailUser);
        const last_conection = {
            status: "offline",
            date_time: new Date(Date.now())
        }
        await userService.updateUser(user.id, {last_conection})
        req.session.destroy(err => {
            if(err) return res.status(500).json({message: err})
            res.redirect('/');
        });
    }
}

export const userController = new UserController();