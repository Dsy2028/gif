import express from 'express';
import otherTest from '../models/other.test.model.js'

const router = express.Router();


router.get('/:courseName', async (req, res) => {
    try {
      const  {courseName } = req.params;

      const courses = await otherTest.find({ courseName: courseName }).populate({
        path: 'units',
        //model: 'units', 
        populate:{path: 'topics'}
       
      }).select('topics name   courseName _id') //.lean();
   
      if(!courses){
        return res.status(404).json({ message: 'Course not found' });
      }
      
      res.status(200).json(courses);
    } catch (error) {
      console.error('Error getting students:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  })
  router.get('/:courseName/name', async (req, res) => {
    try {
      const  { courseName } = req.params;
      console.log(courseName);
      const courses = await otherTest.find({ courseName: courseName }).populate({
        path: 'units',
        //model: 'units', 
       
       
      }).select('topics name   courseName _id') //.lean();
    //  const c = await otherTest.find( );
      if(!courses){
        return res.status(404).json({ message: 'Course not found' });
      }
      
      res.status(200).json(courses);
    } catch (error) {
      console.error('Error getting students:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  })
  router.get('/courses/find', async (req, res) => {
    try {
      const courses = await otherTest.find().populate({
       path: 'units',
        model: 'units',    
      }).select('topics name   courseName _id') //.lean();
      if(!courses){
        return res.status(404).json({ message: 'Course not found' });
      }
      res.status(200).json(courses);
    } catch (error) {
      console.error('Error getting students:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  })

  router.post('/courses/add', async (req, res) => {
    try {
      const { courseName, units } = req.body;
      console.log(courseName)
      console.log(units)
      const addCourse = await otherTest.create({ courseName: courseName , units: units });
      res.status(200).json(addCourse)
    } catch (error) {
      console.error('error creating courses', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  })
  
  router.post('/courses/edit', async (req, res) => {
    try {
      const {courseName, courseId, units} = req.body;
      console.log(courseName)
      console.log(courseId)
      console.log(units)
      const editCourse = await otherTest.updateOne(
        { _id: courseId }, 
        { 
          $set: { courseName: courseName},
          $push: { units: units }
        }
      );
      console.log(editCourse);
      res.status(200).json(editCourse)
    } catch (error) {
      console.error('error editing courses', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  })
  
  router.delete('/courses/delete', async (req, res) => {
    try {
      const {course, courseId} = req.body;
  
      const deleteCourse = await otherTest.updateOne({ _id: courseId }, { $pull: { courses: course } });
      res.status(200).json(deleteCourse);
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  
  }
  )
  router.delete('/delete', async (req, res) => {
    try {
      const { courseId} = req.body;
      console.log(courseId)
  
      const deleteCourse = await otherTest.deleteOne({ _id: courseId })
      console.log(deleteCourse)
      res.status(200).json(deleteCourse);
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  
  }
  )
  router.post('')

  export default router;