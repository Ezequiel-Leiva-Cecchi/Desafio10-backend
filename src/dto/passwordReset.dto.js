// passwordReset.dto.js
export class PasswordResetDTO {
    constructor({ userId, token }) {
        this.userId = userId;
        this.token = token;
    }

    static fromModel(resetModel) {
        return new PasswordResetDTO({
            userId: resetModel.userId,
            token: resetModel.token
        });
    }
}
