import mongoose from "mongoose";


const RecapSchema = new mongoose.Schema({
    title: String,
    topic_id: String,
    sections: [{
      title: String,
      content: String
    }]
  });
  
  const recap = mongoose.model('recap', RecapSchema, 'recap');

  export default recap;