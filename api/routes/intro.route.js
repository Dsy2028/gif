import express from 'express';
import intro from '../models/intro.model.js';

const router = express.Router();

router.get('/intro/:topicId/:introId', async (req, res) => {
    try {
        const  {introId, topicId} = req.params;
        const Intro = await intro.findOne( {_id: introId} );
        if (!Intro) {
            return res.status(404).json({ message: ' not found' });
          }
        res.status(200).json( Intro);
    } catch (error) {
        res.status(500).json({message: error});
        console.log(error);
    }
})

router.get('/test', async (req, res) => {
    try {
      const docs = await intro.find({});
      console.log('Received documents:', docs);
      return res.status(200).json(docs);
    } catch (err) {
      console.log('Error:', err);
      return res.status(500).json({ message: 'Error fetching intros' });
    }
  });

export default router;