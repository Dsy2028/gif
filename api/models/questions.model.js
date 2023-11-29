import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  questionText: {
    type: String,
    required: true,
  },
  options: [
    {
      type: [String],
      required: true,
    },
  ],
  correctOption: {
    type: String,
    required: true,
  },
});

const questions = mongoose.model('questions', QuestionSchema);

export default questions;
