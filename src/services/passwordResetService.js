import jwt from 'jsonwebtoken';
import { createHash, isValidPassword } from '../utils/bcrypt.js';
import { passwordResetDAO } from '../dao/passwordReset/indexPasswordReset.js';
import nodemailer from 'nodemailer'; // Importa nodemailer para enviar correos electrónicos

const secretKey = process.env.SESSION_SECRET; 

// Configura el transporte de nodemailer con tus credenciales de correo electrónico
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tucorreo@gmail.com', 
        pass: 'tucontraseña' 
    }
});

// Función para generar un token de restablecimiento de contraseña
export const generateResetToken = async (userId, expiresIn = '1h') => {
    const token = jwt.sign({ userId }, secretKey, { expiresIn });
    await passwordResetDAO.saveResetToken(userId, token);
    return token;
};

// Función para verificar un token de restablecimiento de contraseña
export const verifyResetToken = async (token) => {
    try {
        const decoded = jwt.verify(token, secretKey);
        const userId = decoded.userId;
        // Verificar si el token existe en la base de datos
        const isValidToken = await passwordResetDAO.verifyResetToken(userId, token);
        if (!isValidToken) {
            throw new Error('Invalid or expired token');
        }
        return userId; 
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new Error('Token expired');
        } else if (error.name === 'JsonWebTokenError') {
            throw new Error('Invalid token');
        } else {
            throw new Error('Error verifying token');
        }
    }
};

// Función para cambiar la contraseña del usuario
export const changePassword = async (userId, newPassword) => {
    try {
        // Hashear la nueva contraseña
        const hashedPassword = createHash(newPassword);
        // Actualizar la contraseña del usuario en la base de datos
        await passwordResetDAO.updatePassword(userId, hashedPassword);
    } catch (error) {
        throw new Error('Error changing password');
    }
};

// Función para enviar el correo electrónico de restablecimiento de contraseña
export const sendPasswordResetEmail = async (email, resetToken) => {
    try {
        // Configura el correo electrónico
        const mailOptions = {
            from: 'ezequielleivacecchi@gmail.com', 
            to: email, 
            subject: 'Restablecimiento de contraseña',
            text: `Hemos recibido una solicitud para restablecer tu contraseña. Si no solicitaste esto, puedes ignorar este correo electrónico. De lo contrario, haz clic en el siguiente enlace para restablecer tu contraseña: http://localhost:8080/api/password-reset/reset`
        };

        // Envía el correo electrónico
        await transporter.sendMail(mailOptions);
        
        console.log('Password reset email sent successfully');
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw new Error('Failed to send password reset email');
    }
};
