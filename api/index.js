import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
// import { verifyToken } from './utils/verifyUser.js';
dotenv.config();

const app = express();

// app.use(verifyToken);
app.use(express.json())
app.use(cookieParser())

const MONGO = process.env.MONGO
mongoose.connect(MONGO)
    .then(() => {
        console.log('MongoDB Connected');
        app.listen(3000, () => {
            console.log('Server Started at Port : 3000')
        });
    }).catch((err) => {
        console.log(err)
    });

    app.use('/api/user', userRouter);
    app.use('/api/auth', authRouter);


app.use((err, req, res, next)=>{
    const statusCode =err.statusCode || 500;
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
    
}
)


