import { usersMongo } from "../DAO/managers/UsersMongo.js";
import { hashData, compareData } from "../utils/utils.js";
import { cartService } from "./carts.service.js";
import  transporter  from "./mailer/nodemailer.js";
import UsersDTO from "../DTO/users.dto.js";

class UserService{
    async getOne(email, password){
        const user = await usersMongo.getByEmail(email);
        if(!user){
            return {userValid: false, msg: "Usuario no existe, debe registrarse"};
        }
        if(!await compareData(password, user.password)){
            return { userValid: true, authorized: false };
        } else{
            return { userValid: true, authorized: true, user };
        }
    }

    async getById(id){
        const user = await usersMongo.getById(id);
        if(!user){
            return {userfoud: false, msg: "Usuario no existe"};
        }
        return {userFound: true, user}
    }
    
    async create(userObj){
        const verifyUser = await usersMongo.getByEmail(userObj.email);
        if(verifyUser){
            return { operationFail: true, msg: "El correo ingresado ya se encuantra registrado."};
        }
        const hashPassword = await hashData(userObj.password);
        const cartUser = await cartService.createCarrito();
        const newUser = {
            ...userObj,
            password: hashPassword,
            cart: cartUser._id,
            last_conection: {
                status: "offline",
                date_time: new Date(Date.now())
            }
        }
        const result =  await usersMongo.createOne(newUser);
        return result;
    }

    async updateUser(id, obj, passwd){
        const user = await usersMongo.getById(id);
        if(!user) {
            return { operationFail: true, msg: "Ocurrió un error al modificar los datos del usuario."};
        }
        if(passwd){
            const { password } = obj;
            const newPass = await hashData(password);
            const modifyObj = {
                password: newPass,
                recoveryPass: false,
                recoveryPassControl: ''
            }
            const newUserPass = await usersMongo.updateOne(id, modifyObj);
            return newUserPass;
        } else{
            const updUser = await usersMongo.updateOne(id, obj);
            console.log(updUser);
            return updUser;
        }
    }

    async deleteUser(id){
        try {
            const delUser = await usersMongo.deleteOne(id);
            return delUser;
        } catch (error) {
            return error;
        }
    }

    async passRecover(email){
        const verUser = await usersMongo.getByEmail(email);
        if(!verUser){
            return { operationFail: true, msg: "El correo ingresado no existe."};
        }
        const recoverControls = {
            recoveryPass: true,
            recoveryPassControl: new Date(Date.now() + 300000) //creando el tiempo de validez para el link (5 min para pruebas)
        };
        console.log(verUser);
        const msgOpt = {
            from: 'E-commerce CodeHouse',
            to: email,
            subject: 'Reestablecer contraseña',
            template: 'emailPassReset',
            context: {
                userId: verUser._id
            }
        }
        await transporter.sendMail(msgOpt);
        const updUser = await usersMongo.updateOne(verUser._id, recoverControls);
        return {updUser, msg: 'Se envió el correo de recuperación de contraseña, verifique su bandeja de entrada. El correo es valido durante 1 hora.'};
    }

    async getAll(){
        try {
            const users = await usersMongo.getAll();
            const usersData = users.map((user) => new UsersDTO(user));
            return usersData;
        } catch (error) {
            return error;
        }
    }
}

export const userService = new UserService();