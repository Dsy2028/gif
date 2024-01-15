import express from 'express'
import mongoose from 'mongoose';

import courseheader from '../models/courseheader.model.js';



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

router.post('/courses/add', async (req, res) => {
  try {
    const { courseHeader, courses } = req.body;
    console.log(courseHeader)
   console.log(courses);
    const addHeader = await courseheader.create({ courseHeader: courseHeader , courses: courses });
    res.status(200).json(addHeader)
  } catch (error) {
    console.error('error creating courses', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.post('/courses/edit', async (req, res) => {
  try {
    const {courseHeader, courseId, courses} = req.body;
    console.log('f' , courseHeader)
    console.log(courseId)
    console.log(courses)
    const editHeader = await courseheader.updateOne(
      { _id: courseId }, 
      { 
        $set: { courseHeader: courseHeader},
        $push: { courses: courses }
      }
    );
    console.log(editHeader);
    res.status(200).json(editHeader)
  } catch (error) {
    console.error('error editing courses', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.delete('/courses/delete', async (req, res) => {
  try {
    const {course, courseId} = req.body;

    const deleteCourse = await courseheader.updateOne({ _id: courseId }, { $pull: { courses: course } });
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

    const deleteCourse = await courseheader.deleteOne({ _id: courseId })
    console.log(deleteCourse)
    res.status(200).json(deleteCourse);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }

}
)

export default router;