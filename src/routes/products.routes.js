import { Router } from 'express';
import { getProducts, getProduct, addProduct, editProduct, deleteProduct } from '../controllers/product.controller.js';

const ProductsRouter = Router();
// Ruta para obtener una lista de productos paginados
ProductsRouter.get('/', getProducts);
// Ruta para obtener un producto por su ID
ProductsRouter.get('/:productId', getProduct);
// Ruta para agregar un nuevo producto
ProductsRouter.post('/', addProduct);
// Ruta para editar un producto existente
ProductsRouter.put('/:productId', editProduct);
// Ruta para eliminar un producto por su ID
ProductsRouter.delete('/:productId', deleteProduct);

export default ProductsRouter;
