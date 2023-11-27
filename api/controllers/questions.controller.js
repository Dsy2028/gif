import questions from '../models/questions.model.js';

export const getQuestions = async (req, res) => {
    const question = req.params.questions;

    try {
      const course = await questions.findOne({ courseName: courseName });

      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }

      res.json(course);
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
