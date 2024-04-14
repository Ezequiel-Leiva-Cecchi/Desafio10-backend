import * as cartService from '../services/cartService.js';

export const getCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cart = await cartService.getCartById(cid); 
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const addCart = async (req, res, next) => {
    try {
        const newCart = await cartService.createCart();
        console.log("New cart created:", newCart); 
        res.json({ message: 'Successfully added cart', cartId: newCart._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addProductInCart = async (req, res, next) => {
    try {
        const { cid, pid } = req.params; 
        if (!cid || !pid) {
            return res.status(400).json({ error: 'Cart ID and Product ID are required' });
        }

        await cartService.addProductToCart(cid, pid);
        res.json({ message: 'Product added to cart successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const deleteCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        await cartService.deleteCart(cid);
        res.json({ message: 'Successfully deleted cart' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteProductFromCart = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;  
        await cartService.deleteProductInCart({ cid, pid }); 
        res.json({ message: 'Product deleted from cart successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
