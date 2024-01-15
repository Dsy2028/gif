import intro from '../models/intro.model.js';

  export const getintro = async (req, res) => {
    try {
      const { _id } = req.params;

      const Intro = await intro.findById({_id});
      console.log(Intro);

      if (!Intro) {
        return res.status(404).json({ message: 'Lesson for intro not found' });
      }
     
      res.status(200).json(Intro);
    } catch (error) {
      console.error('Error fetching lesson data:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
//try agian
//lesson not found