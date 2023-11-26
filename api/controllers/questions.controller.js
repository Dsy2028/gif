import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import {errorHandler} from '../utils/error.js';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import path from 'path';
import { readFile } from 'fs/promises';

export const getQuestions = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '..', 'json', 'math-questions.json');
    const questionsData = await readFile(filePath, 'utf-8');
    const questions = JSON.parse(questionsData);
    res.json(questions);
    
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const submitQuiz = async (req, res) => {
  try {
    
  } catch (error) {
    next(error)
  }
}
