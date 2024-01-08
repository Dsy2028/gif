import express from 'express';
import unit from '../models/unit.model.js'

const router = express.Router();


router.get('/:unitId', async (req, res) => {
    try {
      const { unitId } = req.params;
      const units = await unit.find({ _id: unitId }).populate({
        path: 'topics',
        model: 'topics', 
       
      }).select('topicName name course _id') //.lean();
      
      res.status(200).json(units);
    } catch (error) {
      console.error('Error getting students:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  })

  export default router;// select: 'topicName questions course _id',