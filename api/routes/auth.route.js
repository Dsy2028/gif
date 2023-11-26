import express from 'express';
import {signup,signin, google, logOut} from '../controllers/auth.controller.js';
const router = express.Router();

router.post('/signup', signup)
router.post('/log-in', signin)
router.post('/google', google)
router.get('/logout', logOut)
export default router;