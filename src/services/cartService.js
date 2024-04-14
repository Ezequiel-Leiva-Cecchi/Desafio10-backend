import { cartDAO } from '../dao/cart/indexCart.js'; 

export const createCart = async () => {
    try {
        const newCart = await cartDAO.createCart();
        console.log("Cart created successfully:", newCart);
        return newCart; 
    } catch (error) {
        console.error("Error creating cart:", error);
        throw new Error('Failed to create cart'); 
    }
};

export const getCartById = async (cid) => {
    try {
        console.log("Fetching cart with ID:", cid); 
        const cart = await cartDAO.getCartById(cid);
        console.log("Retrieved cart:", cart);  
        return cart;
    } catch (error) {
        console.error("Error fetching cart:", error); 
        throw new Error('Failed to get cart');
    }
};

export const addProductToCart = async (cid, pid) => {
    try {
        await cartDAO.addProductCarts(cid, pid);
    } catch (error) {
    
        console.error(`Error adding product to cart. Cart ID: ${cid}, Product ID: ${pid}.`);
        console.error('Original error:', error);
        throw new Error('Failed to add product to cart');
    }
};

export const deleteCart = async (cid) => {
    try {
        await cartDAO.deleteCart(cid);
    } catch (error) {
        throw new Error('Failed to delete cart');
    }
};

export const deleteProductInCart = async ({ cid, pid }) => {
    try {
        await cartDAO.deleteProductCart( cid, pid );
    } catch (error) {
        throw new Error('Failed to delete product from cart');
    }
};
