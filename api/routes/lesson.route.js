import express from 'express';
import { getLesson, getAllLessons } from '../controllers/lessons.controller.js';

const router = express.Router();

router.get('/courses/:courseName/:lessonName', getLesson )
router.get('/getAllLessons', getAllLessons )

export default router;