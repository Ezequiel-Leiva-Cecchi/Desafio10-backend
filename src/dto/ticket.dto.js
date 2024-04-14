export class TicketDTO {
    constructor({ code, purchase_datetime, amount, purchaser }) {
        this.code = code;
        this.purchase_datetime = purchase_datetime;
        this.amount = amount;
        this.purchaser = purchaser;
    }

    static fromModel(ticketModel) {
        return new TicketDTO({
            code: ticketModel.code,
            purchase_datetime: ticketModel.purchase_datetime,
            amount: ticketModel.amount,
            purchaser: ticketModel.purchaser,
        });
    }
}
