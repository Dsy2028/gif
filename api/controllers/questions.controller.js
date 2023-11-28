import questions from '../models/questions.model.js';

export const getQuestions = async (req, res) => {
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
};




export const submitQuiz = async (req, res) => {
  try {
  } catch (error) {
    next(error)
  }
}
