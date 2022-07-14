import express from 'express';
import authenticateToken from '../middlewares/auth.js';
import { register, login, list } from '../controllers/userControllers.js';
const router = express.Router();


router.post('/register', register);

router.post('/login', login);

router.get('/list', authenticateToken, list); // The token needs to go into the header of postman when testing


export default router; 