import mongoose from "mongoose";


const IntroSchema = new mongoose.Schema({
    title: String,
    topic_id: String,
    sections: [{
      title: String,
      content: [String]
    }]
  });
  
  const intro = mongoose.model('intro', IntroSchema, 'intro');

  export default intro;