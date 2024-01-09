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

  router.post('')

  export default router;