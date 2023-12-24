import BasicMongo from "./BasicMongo.js";
import { userModel } from "../db/models/user.model.js";

class UsersMongo extends BasicMongo{
    constructor(){
        super(userModel);
    }

    async getByEmail(email){
        const user = await userModel.findOne({email});
        return user;
    }
}

export const usersMongo = new UsersMongo();