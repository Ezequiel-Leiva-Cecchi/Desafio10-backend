import { Router } from "express";
import { requireAuth} from "../middlewares/authMiddleware.js";
import { register, login, logout, loginWithGithub } from "../controllers/users.controller.js";
import passport from "passport";

const sessionRoutes = Router();

sessionRoutes.post('/register',passport.authenticate('register', { failureRedirect: '/failregister' }),register);
sessionRoutes.post('/login', passport.authenticate('login'), login);
sessionRoutes.post('/logout', requireAuth, logout);
sessionRoutes.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
sessionRoutes.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }));

export default sessionRoutes;
