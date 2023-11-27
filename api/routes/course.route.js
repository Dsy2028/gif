import express from 'express';
import {getCourseByName} from '../controllers/course.controller.js';
import Course from '../models/course.model.js';
const router = express.Router(); 

router.get('/courses/:courseName',getCourseByName);

export default router;