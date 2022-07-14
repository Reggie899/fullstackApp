import express from 'express';
import { getTest, postTest } from '../controllers/testing.js';
const router = express.Router();


router.get('/', getTest);

router.post('/', postTest);

// router.post('/register', register);

// router.post('/login', login);


export default router; 