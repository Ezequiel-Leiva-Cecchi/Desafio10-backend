import fs from 'fs';

// Ruta del archivo de carritos
const path = '../../data/cart.json';

// Clase para representar un carrito
class Cart {
    constructor({ id }) {
        this.id = id.toString();
        this.products = [];
    }
}

// Clase para el acceso a los carritos mediante FileSystem
export class CartsFs {
    // Método para validar el archivo de carritos
    async validateFile() {
        try {
            const res = await fs.promises.readFile(path);
            const data = await JSON.parse(res);
            return data;
        } catch (error) {
            // Si hay un error al leer el archivo, crea un nuevo archivo vacío de carritos
            await fs.promises.writeFile(path, JSON.stringify([]));
            return []; // Devuelve un arreglo vacío
        }
    }

    // Método para obtener todos los carritos
    async getCart() {
        return await this.validateFile();
    }

    // Método para obtener un carrito por su ID
    async getCartById(id) {
        const carts = await this.validateFile();
        const existCart = carts.find((cart) => cart.id.toString() === id.toString());
        if (!existCart) {
            throw new Error('CART NOT FOUND'); 
        } else {
            return existCart; // Devuelve el carrito encontrado
        }
    }

    // Método para agregar un carrito
    async addCart() {
        const carts = await this.validateFile();
        const newCart = new Cart({ id: carts.length + 1 });
        carts.push(newCart); // Agrega el nuevo carrito al arreglo de carritos
        await fs.promises.writeFile(path, JSON.stringify(carts)); // Escribe los carritos actualizados en el archivo
        return { id: newCart.id }; // Devuelve el ID del nuevo carrito
    }

    // Método para agregar un producto a un carrito
    async addProductInCart(cartId, productId) {
        const carts = await this.validateFile();
        const indexInCart = carts.findIndex((cart) => cart.id === cartId);
        if (indexInCart < 0) {
            throw new Error('CART NOT FOUND'); 
        }
        const products = await productDAO.getProducts();
        if (!products.find((product) => product.id === productId)) {
            throw new Error('PRODUCT NOT FOUND'); // Lanza un error si el producto no se encuentra
        }
        const productIndex = carts[indexInCart].products.findIndex((product) => product.id === productId);
        if (productIndex < 0) {
            // Si el producto no existe en el carrito, lo agrega con una cantidad de 1
            carts[indexInCart].products.push({ id: productId, quantity: 1 });
        } else {
            // Si el producto ya existe en el carrito, incrementa su cantidad
            carts[indexInCart].products[productIndex].quantity++;
        }
        await fs.promises.writeFile(path, JSON.stringify(carts)); // Escribe los carritos actualizados en el archivo
    }

    // Método para eliminar un producto de un carrito
    async deleteProductCart({ cartId, productId }) {
        const carts = await this.validateFile();
        const indexInCart = carts.findIndex((cart) => cart.id === cartId);
        if (indexInCart < 0) {
            throw new Error('CART NOT FOUND'); 
        }
        carts[indexInCart].products = carts[indexInCart].products.filter((product) => product.id !== productId);
        // Filtra los productos del carrito para eliminar el producto deseado
        await fs.promises.writeFile(path, JSON.stringify(carts)); // Escribe los carritos actualizados en el archivo
    }

    // Método para eliminar un carrito por su ID
    async deleteCart(id) {
        const carts = await this.validateFile();
        const indexInCart = carts.findIndex((cart) => cart.id === id);
        if (indexInCart < 0) {
            throw new Error(`Cart not found`); 
        }
        const deleteCart = carts[indexInCart]; // Obtiene el carrito a eliminar
        const updateCart = carts.filter((cart) => cart.id !== id); // Filtra los carritos para eliminar el carrito deseado
        await fs.promises.writeFile(path, JSON.stringify(updateCart)); // Escribe los carritos actualizados en el archivo
        return deleteCart; 
    }
}
