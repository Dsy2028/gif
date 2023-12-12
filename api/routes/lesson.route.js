import express from 'express';
import { getLesson } from '../controllers/lessons.controller.js';

const router = express.Router();

router.get('/courses/:courseName/:lessonName', getLesson )

export default router;