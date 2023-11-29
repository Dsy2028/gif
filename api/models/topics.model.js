import mongoose from 'mongoose';

const TopicSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  topicName: {
    type: String,
    required: true,
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'questions',
    },
  ],
});

const topics = mongoose.model('topics', TopicSchema);

export default topics;
