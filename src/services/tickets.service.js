import { ticketMongo } from "../DAO/managers/TicketsMongo.js";
import transporter from "./mailer/nodemailer.js";

class TicketService {
  async createTicket(amount, userEmail) {
    let ticket = {
        code: this.#generateTicketCode(),
        purchase_datetime: new Date(Date.now()),
        amount: amount,
        purchaser: userEmail
    };
    try {
        const newTicket = await ticketMongo.createTicket(ticket);
        const msgOpt = {
          from: 'E-commerce CodeHouse',
          to: ticket.purchaser,
          subject: 'Compra Exitosa',
          template: 'emailCompra',
          context: {
              data: ticket
          }
        }
        await transporter.sendMail(msgOpt);
        return newTicket;
    } catch (error) {
        return error;
    }  
  }

  #generateTicketCode() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 15; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }
}

export const ticketService = new TicketService();