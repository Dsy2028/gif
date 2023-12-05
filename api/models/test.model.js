import mongoose from 'mongoose';
const CourseSchema = new mongoose.Schema({
    courseName: {
      type: String,
      required: true
    },
    units: [TopicSchema]
  });
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
    questions: [QuestionSchema],
  });

  const course = new mongoose.model('course', CourseSchema);