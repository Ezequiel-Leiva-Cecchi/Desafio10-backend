import mongoose from "mongoose";
import leanVirtuals from 'mongoose-lean-virtuals';
import paginate from 'mongoose-paginate-v2';

const productsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    }
});

productsSchema.virtual('id').get(function () {
    return this._id.toString();
});

productsSchema.set('toJSON', { virtuals: true });
productsSchema.set('toObject', { virtuals: true });

productsSchema.plugin(paginate);
productsSchema.plugin(leanVirtuals);

const productsModel = mongoose.model('Product', productsSchema); 

export default productsModel;
