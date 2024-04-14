import { PasswordResetMongoose } from "./passwordReset.mongoose.js";

let passwordResetDAO;

const DAO_OPTION = process.env.DAO_OPTION;

switch (DAO_OPTION) {
    case 'mongoose':
        passwordResetDAO = new PasswordResetMongoose();
        break;
    default:
        passwordResetDAO = new PasswordResetMongoose();
}

export { passwordResetDAO };