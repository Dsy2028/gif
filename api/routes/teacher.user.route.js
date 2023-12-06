import express from 'express';
import teacherSignup from 'teacher.auth.controller.js'

const router = express.Router();

router.post('/', teacherSignup);

export default router;