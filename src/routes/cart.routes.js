import { Router } from "express";
import { getCart, addCart, addProductInCart, deleteProductFromCart, deleteCart} from '../controllers/cart.controller.js';

const cartRouter = Router();

cartRouter.get('/:cid', getCart);
cartRouter.post('/', addCart);
cartRouter.post('/:cid/p/:pid', addProductInCart);
cartRouter.delete('/:cid/p/:pid', deleteProductFromCart); 
cartRouter.delete('/:cid', deleteCart);
export default cartRouter;
