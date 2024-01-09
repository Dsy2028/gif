import express from 'express';
import Class from '../models/class.model.js';
import { verifyToken } from '../utils/verify.js';
import mongoose from 'mongoose';
const router = express.Router();

router.post('/', async (req, res) => {
  const newClass = new Class(req.body);
  await newClass.save();
  res.status(201).json(newClass);
});

router.post('/className', async (req, res) => {
  const { className, classId } = req.body;

  try {
    
    const updatedClass = await Class.updateOne({ _id: classId }, { $set: { className } });

    if (updatedClass.nModified === 0) {
      return res.status(404).json({ message: 'Class not found or not modified' });
    }

    res.status(200).json(updatedClass);
  } catch (error) {
    console.error('Error updating class name:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/join', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const classToJoin = await Class.findOne({ code: new RegExp(`^${req.body.code}$`, 'i') });
    if (!classToJoin) {
      console.log('Class not found');
      return res.status(404).json({ message: 'Class not found' });
    }
    if (classToJoin.students.includes(userId)) {
      console.log('User is already in the class');
      return res.status(400).json('You are already in the class');
    }
    classToJoin.students.push(userId);
    await classToJoin.save();
    const populatedClass = await Class.findById(classToJoin._id).populate({
      path: 'students',
      select: 'email firstName lastName avatar',
    });
    res.status(200).json(populatedClass);
  } catch (error) {
    console.error('Error joining class:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/students', async (req, res) => {
  try {
    const { classId } = req.query;
    const students = await Class.find({ _id: classId }).populate({
      path: 'students',
      select: 'quizResults',
    });
    
    res.status(200).json(students);
  } catch (error) {
    console.error('Error getting students:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

/*router.get('/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    const classes = await Class.find({ students: { $in: [studentId] } }).populate('students', ' avatar firstName lastName  email');
    res.status(200).json(classes);
  } catch (error) {
    console.error('Error getting classes by student:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});*/



router.get('/:teacherId',  async (req, res) => {
  try {
    const id = req.params.teacherId;
    const classToGet = await Class.find({ teacher: id }).populate('students');
    const classes = await Class.find({ students: { $in: [id] } }).populate('students', ' avatar firstName lastName  email');
    if (!classToGet && classes ) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.status(200).json({ classToGet, classes });
  } catch (error) {
    console.error('Error getting classes by teacher:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

  router.delete('/delete', async (req, res) => {
    const { code } = req.body;
  
    try {
      const deletedClass = await Class.deleteOne({ code: code });
  
      if (deletedClass.deletedCount === 0) {
        return res.status(404).json({ message: 'Class not found' });
      }
  
      res.status(200).json({ message: 'Class deleted successfully' });
    } catch (error) {
      console.error('Error deleting class:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  router.delete('/delete/student', async (req, res) => {
    const { code, studentId } = req.body;
  
    try {
      const updatedClass = await Class.findOneAndUpdate(
        { code: code },
        { $pull: { students: studentId } },
        { new: true }  // return the updated document
      );
  
      if (!updatedClass) {
        return res.status(404).json({ message: 'Class not found' });
      }
  
      res.status(200).json({ message: 'Student removed successfully', class: updatedClass });
    } catch (error) {
      console.error('Error removing student:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  router.post('/classCourse', async (req, res) => {
    const { classCourse, classId } = req.body;
  
    try {
      
      const updatedClass = await Class.updateOne({ _id: classId }, { $push: { courses: { $each: classCourse } } });
  
      if (updatedClass.nModified === 0) {
        return res.status(404).json({ message: 'Class not found or not modified' });
      }
  
      res.status(200).json(updatedClass);
      
    } catch (error) {
      console.error('Error updating class name:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });



 export default router;

 //"__v": { "$numberInt": "0" }