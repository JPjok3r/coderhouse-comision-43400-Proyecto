import { usersMongo } from "../DAO/managers/UsersMongo.js";
import UserDTO from "../DTO/user.dto.js";

class SessionService{
    async currentSession(email){
        try {
            const user = await usersMongo.getByEmail(email);
            if(!user) throw new Error("Usuario no encontrado");
            const userDto = new UserDTO(user);
            return userDto;
        } catch (error) {
            return error;
        }
    }
}

export const sessionService = new SessionService();