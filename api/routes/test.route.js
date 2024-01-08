import express from 'express';
import otherTest from '../models/other.test.model.js'

const router = express.Router();


router.get('/:courseId', async (req, res) => {
    try {
      const  { courseId } = req.params;
      console.log(courseId);
      const courses = await otherTest.find({ _id: courseId }).populate({
        path: 'units',
        model: 'units', 
       
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

  export default router;