import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
export const verifyToken = (req, res, next) => {

    const token = req.cookies.access_token;
    if (!token)return next(errorHandler(401, 'Unauthorized'));
    console.log(token)
    jwt.verify(token, process.env.JWT_SECRET, (err, user) =>{

        if (err) {
            console.log(err); // Log the error to check why token verification failed
            return next(errorHandler(401, 'Forbidden'));
        }
        req.user = user;
        next();
    })
}