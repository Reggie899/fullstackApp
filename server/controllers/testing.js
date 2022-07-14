
import Test from '../models/Test.js';
// import {validationResult} from 'express-validator';
// import generateToken from '../helpers/generateToken.js';



export const getTest = (req, res) => {
    res.status(200).json({ message: 'my server is responding !!!' });
}

export const postTest = async (req, res) => {
    const { name } = req.body;
    const newTest = new Test({ name });
    try {
        await newTest.save();
        res.status(201).json(newTest);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

}

