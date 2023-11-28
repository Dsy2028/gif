import express from 'express';
import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
    course: {
      type: String,
      required: true
    },
    question: {
        type: String,
        required: true
    },
    options: [
        {
            type: String,
            required: true
        }
    ],
    correctOption: {
        type: String,
        required: true
    },
  });
  
  const questions = mongoose.model('questions', QuestionSchema);
  
  export default questions;