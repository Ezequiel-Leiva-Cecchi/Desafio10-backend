import { ProductDTO } from "../../dto/products.dto.js";

export default class ProductRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getProducts = async () => {
        try {
            const result = await this.dao.get();
            return result;
        } catch (error) {
            console.error('Error al obtener productos:', error);
            throw error;
        }
    }

    createProduct = async (product) => {
        try {
            const newProduct = new ProductDTO(product);
            const result = await this.dao.post(newProduct);

            return result;
        } catch (error) {
            console.error('Error al crear un producto:', error);
            throw error;
        }
    }
}
