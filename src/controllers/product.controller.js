import * as productsServices from '../services/productsServices.js';
import { validateAddProducts, validateEditProducts } from "../utils/validation.js"; 


export const getProducts = async (req, res, next) => {
    try {
        const { limit, sort, page, query } = req.query; 
        const options = {
            limit: !limit ? 10 : limit, 
            sort: sort ? { price: sort } : undefined, 
            page: page ? page : 1, 
        };
        const products = await productsServices.getProducts(query, options);
        res.json({ status: 'success', ...products });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getProduct = async (req, res, next) => {
    try {
        const { productId } = req.params; 
        const product = await productsServices.getProductById(productId);
        res.json({ product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const addProduct = async (req, res, next) => {
    const { body } = req;
    try {
        const absentProperty = validateAddProducts(body);
        if (absentProperty) {
            throw new Error(`Absent property ${absentProperty}`);
        }
        const userId = req.user ? req.user._id : null;
        if (!userId) {
            throw new Error('User not authenticated');
        }

        res.json({ message: 'Product added successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const editProduct = async (req, res, next) => {
    try {
        const { body, params } = req;
        const { productId } = params; 
        const validation = validateEditProducts(body);
        if (Object.keys(validation).length === 0) {
            throw new Error('At least one of the following properties is required:name, price, stock, category, description, code');
        }
        await productsServices.editProduct(productId, validation);
        res.json({ message: 'Successfully edit product' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const { productId } = req.params; 
        await productsServices.deleteProduct(productId);
        res.json({ message: 'Successfully delete product' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
