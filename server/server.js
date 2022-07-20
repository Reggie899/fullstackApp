import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import testRouter from './routes/testRouter.js';
import userRouter from './routes/userRouter.js';
import postMessageRouter from './routes/postMessageRouter.js';
import postStory from'./routes/storyRouter.js';
import mongoose from 'mongoose';
import { connectSync, connectDB } from './helpers/dbConnect.js';



const server = express();


dotenv.config();


server.use(cors()); 
server.use(express.json()); 

server.use('/test', testRouter);
server.use('/user', userRouter);
server.use('/post', postMessageRouter);
server.use('/story', postStory);




connectDB();
mongoose.connection.on("open", () => {
        console.log("connected to db")
});
mongoose.connection.on("error", (error) => {
console.log("Connection to MongoDB has failed ", error.message);
    
});

const PORT = process.env.PORT;

server.listen(PORT, () => console.log(`Server is listening to port ${PORT} and running`));