import express from 'express';
import Class from '../models/class.model.js';
import { verifyToken } from '../utils/verify.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const newClass = new Class(req.body);
  await newClass.save();
  res.status(201).json(newClass);
});

router.post('/api/classes/join',verifyToken,  async (req, res) => {
    req.user.id
    const classToJoin = await Class.findOne({ code: req.body.code, teacher: req.user.id });
    if (!classToJoin) {
      return res.status(404).json({ message: 'Class not found' });
    }
    classToJoin.students.push(req.body.student);
    await classToJoin.save();
    res.status(200).json(classToJoin);
  });


  router.get('/', verifyToken, async (req, res) => {
    const classToGet = await Class.findById(req.user.id);
    console.log('user id', req.user.id);
    if (!classToGet) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.status(200).json(classToGet);
  });
 export default router;

 //"__v": { "$numberInt": "0" }