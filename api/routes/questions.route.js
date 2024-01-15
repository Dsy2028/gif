import express from 'express';
import questions from '../models/questions.model.js';
///import {getQuestions} from '../controllers/questions.controller.js';

const router = express.Router();

router.post('/questions/add', async (req, res) => {
  try {
    const { name, course, topics } = req.body;
    const addUnit = await unit.create({ name: name , topics: topics ,course: course });
    res.status(200).json(addUnit)
  } catch (error) {
    console.error('error creating courses', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.post('/units/edit', async (req, res) => {
  try {
    const {unitId, name, course, topics} = req.body;
    const editUnit = await unit.updateOne(
      { _id: unitId }, 
      { 
        $set: { name: name},
        $set: { course: course},
        $push: { topics: topics }
      }
    );
   
    res.status(200).json(editUnit)
  } catch (error) {
    console.error('error editing courses', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.delete('/units/delete', async (req, res) => {
  try {
    const {unitId, topics} = req.body;

    const deleteUnit = await otherTest.updateOne({ _id: unitId }, { $pull: { topics: topics } });
    res.status(200).json(deleteUnit);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }

}
)
router.delete('/delete', async (req, res) => {
  try {
    const { unitId} = req.body;
  

    const deleteUnit = await unit.deleteOne({ _id: unitId })

    res.status(200).json(deleteUnit);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }

}
)
export default router;