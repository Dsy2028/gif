import mongoose from 'mongoose';
const QuestionSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  questionText: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
      required: true,
    },
  ],
  correctOption: {
    type: String,
    required: true,
  },
});

const TopicSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  topicName: {
    type: String,
    required: true,
  },
  course:{
    _id: mongoose.Schema.Types.ObjectId,
    courseName: {
      type: String,
      required: true,
    },
  },
  questions: [QuestionSchema],
  harderQuestions: [QuestionSchema],
  quiz: { 
    quizQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'questions' }],
  },
});

const topics = mongoose.model('topics', TopicSchema);

export default topics;
