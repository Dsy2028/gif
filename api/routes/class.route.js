import express from 'express';
import Class from '../models/class.model.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const newClass = new Class(req.body);
  await newClass.save();
  res.status(201).json(newClass);
});

router.post('/api/classes/join', async (req, res) => {
    const classToJoin = await Class.findOne({ code: req.body.code });
    if (!classToJoin) {
      return res.status(404).json({ message: 'Class not found' });
    }
    classToJoin.students.push(req.body.student);
    await classToJoin.save();
    res.status(200).json(classToJoin);
  });
 export default router;