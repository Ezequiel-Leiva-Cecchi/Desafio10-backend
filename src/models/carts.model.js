// models/carts.model.js
import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product',require:true,},
        quantity: { type: Number, default: 1 ,require:true}
    }]
});

cartSchema.virtual('id').get(function(){
    return this._id.toString();
});
cartSchema.set('toJSON',{virtuals:true});
cartSchema.set('toObject',{virtuals:true});

const cartModel = mongoose.model('carts', cartSchema);

export default cartModel;
