import express from 'express';
import { sendPasswordResetEmail, resetPassword } from '../controllers/passwordReset.controller.js';

const router = express.Router();

// Ruta para enviar un correo electrónico de restablecimiento de contraseña
router.post('/reset/send-email', sendPasswordResetEmail);

// Ruta para restablecer la contraseña con un token
router.post('/reset', resetPassword);

export default router;
