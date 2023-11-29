// controllers/topics.controller.js
import topics from '../models/topics.model.js';
import questions from '../models/questions.model.js';

export const createTopicWithQuestions = async (req, res) => {
  try {
    const { topicName, questionss } = req.body;

    const questionObjects = [];
    for (const question of questionss) {
      const questionObject =
        typeof question === 'string'
          ? await questions.findById(question)
          : question;

      questionObjects.push(questionObject);
    }

    const newTopic = await topics.create({
      topicName,
      questions: questionObjects,
    });

    res.status(201).json(newTopic);
  } catch (error) {
    console.error('Error creating topic with questions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllTopicsWithQuestions = async (req, res) => {
  try {
    const allTopics = await topics.find().populate('questions');

    res.json(allTopics);
  } catch (error) {
    console.error('Error fetching topics with questions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/*export const getTopicWithQuestions = async (req, res) => {
  try {
    const { topicName, question } = req.params;

    console.log('Received parameters:', { topicName, question });

    // Fetch the topic with the specified question
    const result = await topics.findOne({
      topicName,
      'questions._id': question,
    }).populate('questions._id');

    console.error('Result:', result);

    if (!result) {
      return res.status(404).json({ message: 'Topic or question not found' });

    }

    res.json(result);
  } catch (error) {
    console.error('Error fetching topic with question:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
*/
/*export const getTopicWithQuestions = async (req, res) => {
  try {
    console.log(req.params);
    const { topic, questionId } = req.params;

    // Fetch the topic with the specified question
    const result = await topics.findOne({
      topicName: topic,
      'questions._id': questionId,
    }).populate('questions._id');

    if (!result) {
      return res.status(404).json({ message: 'Topic or question not found' });
    }

    res.json(result);
  } catch (error) {
    console.error('Error fetching topic with question:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};*/

export const getTopicWithQuestion = async (req, res) => {
  try {
    console.log(req.params);
    const { topicName, questionId } = req.params;

    const result = await topics.findOne({
      topicName,
      'questions._id': questionId,
    }).populate('questions');
    console.log(result);
    if (!result) {
      return res.status(404).json({ message: 'Topic or question not found' });
    }

    res.json(result);
  } catch (error) {
    console.error('Error fetching topic with question:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
