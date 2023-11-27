import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import {errorHandler} from '../utils/error.js';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import path from 'path';
import { readFile } from 'fs/promises';
import Course from '../models/course.model.js';

export const getCourseByName = async (req, res, next) => {
    const courseName = req.params.courseName;
    const topicName = req.params.topicName; // get  topic name from the request parameters
  
    try {
      const course = await Course.findOne({ courseName: courseName });
  
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      // find topic within the course 
      const topic = course.units.flatMap(unit => unit.topics).find(topic => topic === topicName);
  
      if (!topic) {
        return res.status(404).json({ message: 'Topic not found' });
      }
  
      res.json(topic);
    } catch (error) {
      next(error);
    }
  };