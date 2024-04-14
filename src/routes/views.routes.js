import { Router } from "express";
import { renderIndexPage,renderProductsPage, renderProductPage, renderCartPage, renderLoginPage, renderRegisterPage } from "../controllers/views.controller.js";
import {requireAuth, checkExistingUser } from "../middlewares/authMiddleware.js";

const viewsRoutes = Router();

viewsRoutes.get('/', requireAuth, renderIndexPage);
viewsRoutes.get('/products', requireAuth, renderProductsPage);
viewsRoutes.get('/product/:pid', requireAuth, renderProductPage);
viewsRoutes.get('/cart/:cid', requireAuth, renderCartPage);
viewsRoutes.get('/login', checkExistingUser, renderLoginPage);
viewsRoutes.get('/register', checkExistingUser, renderRegisterPage);

export default viewsRoutes;
