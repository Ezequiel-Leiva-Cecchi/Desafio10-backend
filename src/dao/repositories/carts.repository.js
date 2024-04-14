export default class CartRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getCart = async () => {
        try {
            const result = await this.dao.get();
            return result; 
        } catch (error) {
            console.error('Error al obtener el carrito:', error);
            throw error;
        }
    }

    addCart = async () => {
        try {
            const result = await this.dao.post({}); 
            return result; 
        } catch (error) {
            console.error('Error al agregar un carrito:', error);
            throw error;
        }
    }
}
