import courseheader from '../models/courseheader.model'

export const addCourse = async (req, res) => {
    try {
      const { topicName, questions , course, harderQuestions, quiz } = req.body;
      const topic = await courseheader.create({ topicName, questions, course, harderQuestions, quiz });
    } catch (error) {
      console.error('error creating topic', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  export const editCourse = async (req, res) => {
    try {
      const {courseId,  topicName, questions , course, harderQuestions, quiz } = req.body;
      const topic = await courseheader.updateOne({ _id: courseId }, { $set: { topicName, questions, course, harderQuestions, quiz } });
      res.status(200).json(topic)
    } catch (error) {
      console.error('error creating topic', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }