import mongoose from "mongoose";
import leanVirtuals from "mongoose-lean-virtuals";

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    cid:{
         type: mongoose.Schema.Types.ObjectId,  
         ref: 'cart'  
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.virtual('id').get(function (){
    return this._id.toString();
});
userSchema.set('toJSON',{virtuals: true});
userSchema.set('toObject',{virtual:true});
userSchema.plugin(leanVirtuals);
export  const usersModel = mongoose.model('users', userSchema);
