import jwt from 'jsonwebtoken'; // evtl different import
import dotenv from 'dotenv';

dotenv.config();


export const generateToken = (payload) => {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '960s' }
       );
}


