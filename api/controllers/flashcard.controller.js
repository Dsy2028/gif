import flashcards from "../models/flashcard.model.js";

export const getFlashcardByTopic = async (req, res) => {
    const { flashCardId } = req.params;
  
    try {
      const topic = await flashcards.findById(flashCardId);
  
      if (!topic) {
        return res.status(404).json({ success: false, message: 'Topic not found.' });
      }
  
      return res.status(200).json({ success: true, topic });
    } catch (error) {
      console.error('Error fetching topic:', error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  };
  