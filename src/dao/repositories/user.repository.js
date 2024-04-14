import { UserDTO } from "../../dto/user.dto.js";

export default class UserRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getUsers = async () => {
        try {
            const result = await this.dao.getUsers();
            return result;
        } catch (error) {
            console.error('Error al obtener usuarios:', error.message);
            throw error;
        }
    }

    createUser = async (userData) => {
        try {
            const newUser = new UserDTO(userData);
            const result = await this.dao.createUser(newUser);

            console.log('Usuario creado exitosamente:', result);
            return result;
        } catch (error) {
            console.error('Error al crear un usuario:', error.message);
            throw error;
        }
    }

    getUserByEmail = async (email) => {
        try {
            const result = await this.dao.getUserByEmail(email);
            return result;
        } catch (error) {
            console.error('Error al obtener usuario por correo electrónico:', error.message);
            throw error;
        }
    }
}
