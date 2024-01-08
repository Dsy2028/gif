import express from 'express';
import otherTest from '../models/unit.model.js'

const router = express.Router();


router.get('/:courseId', async (req, res) => {
    try {
      const { courseId } = req.params;
      console.log(courseId);
      const courses = await otherTest.find({ _id: courseId }).populate({
        path: 'units',
        model: 'units', 
       
      }).select('topics name course _id') //.lean();
      const c = await otherTest.find();
      
      
      res.status(200).json(c);
    } catch (error) {
      console.error('Error getting students:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  })

  export default router;