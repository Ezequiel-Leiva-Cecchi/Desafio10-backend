import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    code: { type: String, unique: true },
    purchase_datetime: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
});

ticketSchema.virtual('id').get(function () {
    return this._id.toString();
});

ticketSchema.set('toJSON', { virtuals: true });
ticketSchema.set('toObject', { virtuals: true });

const ticketModel = mongoose.model('tickets', ticketSchema);

export default ticketModel;
