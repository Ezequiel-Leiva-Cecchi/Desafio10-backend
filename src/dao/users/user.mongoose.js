import { usersModel } from "../../models/users.model.js";
import bcrypt from 'bcrypt';

export class usersMongoose {
    async addUsers(object) {
        const users = new usersModel(object);
        await users.save()
        return users.toObject({ virtuals: true });
    }

    async getUserById(id) {
        return await usersModel.findOne({ _id: id }).lean({ virtuals: true });
    }

    async getUserByEmail({email}) { 
        console.log(`Searching for user with email: ${email}`);
        const user = await usersModel.findOne({ email }).lean({ virtuals: true });
        console.log('User found:', user);
        return user;
    }

    async updateUserCart(userId, cartId) {
        try {
            const user = await usersModel.findOneAndUpdate(
                { _id: userId },
                { cartId: cartId },
                { new: true }
            );
            return user;
        } catch (error) {
            throw new Error('Error updating user cart');
        }
    }

    async findUserByEmailAndPassword(email, password) {
        const user = await usersModel.findOne({ email });
        if (!user) {
            return null; 
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return null;
        }
        return user; 
    }
}