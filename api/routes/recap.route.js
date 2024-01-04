import recap from '../models/recap.model.js'
import express from 'express';


const router = express.Router();

router.get('/:recapId/recap', async (req, res) => {
    const { recapId, topicId } = req.params;
    
    try {
        const recapp = await recap.findById({   _id: recapId });
        res.status(200).json(recapp);
    } catch (error) {
        console.error('Error getting recap:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})



export default router;

