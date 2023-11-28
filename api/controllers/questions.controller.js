import questions from '../models/questions.model.js';

export const getQuestions = async (req, res) => {
    const question = req.params.question;

    try {
      const question1 = await questions.findOne({ question: question });

      if (!question1) {
        return res.status(404).json({ message: 'question not found' });
      }

      res.json(question1);
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
