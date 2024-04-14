import { usersMongoose } from "./user.mongoose.js";

let usersDAO;

const DAO_OPTION = process.env.DAO_OPTION;

switch(DAO_OPTION){
    case 'mongoose':
        usersDAO = new usersMongoose();
        break;
        default:
            usersDAO = new usersMongoose();
}
export {usersDAO};