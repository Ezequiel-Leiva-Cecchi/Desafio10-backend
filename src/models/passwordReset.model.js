import mongoose from 'mongoose';

const passwordResetSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    token: String,
    createdAt: { type: Date, default: Date.now, expires: '1h' } 
});

passwordResetSchema.virtual('id').get(function () {
    return this._id.toString();
});

passwordResetSchema.set('toJSON', { virtuals: true });
passwordResetSchema.set('toObject', { virtuals: true });

const PasswordResetModel = mongoose.model('PasswordReset', passwordResetSchema);

export default PasswordResetModel;