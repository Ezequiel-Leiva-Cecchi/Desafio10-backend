import PasswordResetModel from '../../models/passwordReset.model.js';

export class PasswordResetMongoose {
    async createResetToken(userId, token) {
        const resetToken = new PasswordResetModel({
            userId,
            token,
        });
        await resetToken.save();
        return resetToken.toObject();
    }

    async findResetTokenByUserId(userId) {
        return await PasswordResetModel.findOne({ userId }).lean();
    }

    async findResetTokenByToken(token) {
        return await PasswordResetModel.findOne({ token }).lean();
    }

    async deleteResetToken(token) {
        return await PasswordResetModel.deleteOne({ token });
    }
}
