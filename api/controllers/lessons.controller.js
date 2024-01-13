import lessons from "../models/lesson.model.js";


  export const getLesson = async (req, res) => {
    try {
      const { courseName, lessonName } = req.params;
  
 
      const lesson = await lessons.findOne({ courseName,  lessonName });
  
      if (!lesson) {
        return res.status(404).json({ message: 'Lesson not found for the given courseName and lessonName' });
      }
     
      res.status(200).json(lesson);
    } catch (error) {
      console.error('Error fetching lesson data:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  export const getAllLessons = async (req, res) => {
    try {
      const allLessons = await lessons.find();
      if(!allLessons){
        return res.status(404).json({ message: 'No lessons found' });
      }
      res.status(200).json(allLessons);
    } catch (error) {
      console.error('Error fetching lesson data:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  