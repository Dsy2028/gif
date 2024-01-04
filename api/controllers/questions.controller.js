
import questions from '../models/questions.model.js';
import topics from '../models/topics.model.js';
/*export const getQuestions = async (req, res) => {
  const questionText = req.query.question;

  try {
      const question = await questions.findOne({ question: questionText });

      if (!question) {
          return res.status(404).json({ message: 'question not found' });
      }

      res.json(question);
  } catch (error) {
      console.error('Error fetching questions:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};*/




export const submitQuiz = async (req, res) => {
  try {
    
  } catch (error) {
    next(error)
  }
}

// controllers/questions.controller.j
/*export const getQuestions = async (req, res) => {
  try {
    const { topicName, _id } = req.params;

    // Fetch the topic
    const topic = await topics.findOne({ topicName }).populate('questions._id');
    console.log('Topic Name:', topicName);
    console.log('Question ID:', _id);
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    // Find the question in the topic's questions array
    const question = topic.questions.find(q => q._id == _id);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.json({ topic, question });
  } catch (error) {
    console.error('Error fetching topic with question:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};*/

/*export const getQuestions = async (req, res) => {
  try {
    const { topic, questionId } = req.query;
    console.log(req.query);
    // Fetch the topic
    const topicData = await topics.findOne({ topicName: topic  }).populate('questions._id');
    const allTopics = await questions.find();
    console.log('Topic Name:', topic);
    console.log('Question ID:', questionId);
    if (!topicData) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    // Find the question in the topic's questions array
    const question = topicData.questions.find(q => q._id == questionId);
    console.log(question);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.json({ topic: topicData, question });
  } catch (error) {
    console.error('Error fetching topic with question:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};*/