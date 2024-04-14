import { productDAO } from "../dao/product/indexProducts.js"; 

export const getProducts = async (query, options) => {
    try {
        const products = await productDAO.getPaginatedProducts(query, options);
        return products;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getProductById = async (pid) => {
    try {
        const product = await productDAO.getProductById(pid);
        if (!product) {
            throw new Error('PRODUCT NOT FOUND');
        }
        return product;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const addProduct = async (productData) => {
    try {
        // Guardar el producto en la base de datos
        await productDAO.addProduct(productData);
        // Resto del código, si lo hay
    } catch (error) {
        throw new Error(error.message);
    }
};

export const editProduct = async (productId, updatedData) => {
    try {
        const result = await productDAO.editProduct({ id: productId, obj: updatedData });
        if (!result) {
            throw new Error('PRODUCT NOT FOUND');
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteProduct = async (productId) => {
    try {
        const result = await productDAO.deleteProduct(productId);
        if (!result) {
            throw new Error('PRODUCT NOT FOUND');
        }
    } catch (error) {
        throw new Error(error.message);
    }
};
