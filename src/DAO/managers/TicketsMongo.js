import BasicMongo from "./BasicMongo.js";
import { ticketModel } from "../db/models/ticket.model.js";

class TicketMongo extends BasicMongo{
    constructor(){
        super(ticketModel);
    }

    /* async createTicket(data){
        try {
            const newTicket = await ticketModel.create(data);
            return newTicket;
        } catch (error) {
            return error;
        }
    }

    async findOne(code){
        try {
            const ticket = await ticketModel.findOne({code});
            return ticket;
        } catch (error) {
            return error;
        }
    } */
}

export const ticketMongo = new TicketMongo();