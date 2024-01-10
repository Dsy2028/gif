import express from 'express'
import courseheader from '../models/courseheader.model.js'



const router = express.Router();

router.get('/courses', async (req, res) => {
    try {
     const courses = await courseheader.find().populate({
        path: 'courses',
        //model: 'units', 
       
       
      }).select('units courseName courseHeader') //.lean();
     const c = await courseheader.find( );
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