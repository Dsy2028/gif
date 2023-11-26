import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.route.js';
import quizRouter from './routes/user.routes.js';
import questionsRouter from './routes/questions.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();
const app = express();
mongoose.connect("mongodb+srv://admin:admin@bpa-react.xhc3sgs.mongodb.net/bpa-react?retryWrites=true&w=majority").then(() => {
    app.listen(3000,() => {
        console.log('listening on port 3000');
    });
console.log('connected to mongodb');

}).catch((error) => {
    console.log('error')
})
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)
app.use('/api/quiz', quizRouter);
app.use('/api/questions', questionsRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})