import courseheader from '../models/courseheader.model'

export const addCourses = async (req, res) => {
    try {
      const {  courses } = req.body;
      const addHeader = await courseheader.create({ courseHeader: req.body.courseHeader , courses: courses });
  
      res.status(200).json(addHeader)
    } catch (error) {
      console.error('error creating topic', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  export const editCourse = async (req, res) => {
    try {
      const {courseHeader, courseId, courses} = req.body;
      const editHeader = await courseheader.updateOne(
        { _id: courseId }, 
        { 
          $set: { courseHeader: courseHeader},
          $push: { courses: courses }
        }
      );
      res.status(200).json(editHeader)
    } catch (error) {
      console.error('error creating topic', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }