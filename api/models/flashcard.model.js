import mongoose from 'mongoose';


const flashSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
    topicName: {
      type: String,
      required: true
    },
    flashCards: [
        {
            cardFront: String,
            cardBack: String
        }
    ],
    topicId: String
  });

    const flashcards = mongoose.model('flashcards', flashSchema);

    export default flashcards;