import jwt from 'jsonwebtoken'; // evtl different import
import dotenv from 'dotenv';

dotenv.config();


const authenticateToken = (req, res, next) => {
    // FIRST GET THE TOKEN 
    // console.log = 
    const authHeader = req.headers['authorization']; // 'Barear fbashjvsdjzfvwue'
    const token = authHeader && authHeader.split(' ')[1]; //['Barear', 'sdkfbsfsi'];

    // Check if there is a token
    if (token == null) return res.status(401).json({ message: 'token not found' });

    // verify the token usingh jwt
    jwt.verify(
        token,
        process.env.JWT_SECRET, // we get it from the config/default.json
        (err, user) => {
            if (err) return res.status(403).json({ message: 'Forbidden !!!' });
            req.user = user; 
            next();
        }
    );

}

export default authenticateToken;