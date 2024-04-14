import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 8080;
export const MONGODB_URL = process.env.MONGODB_URL;
export const SESSION_SECRET = process.env.SESSION_SECRET;
