import mongoose from 'mongoose'

const courseheaderSchema = new mongoose.Schema({
    courseheader: {
      type: String,
      required: true
    },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tests'}]
  });
  
  const courseheader = mongoose.model('courseheader', courseheaderSchema, 'courseheader');
  
  export default courseheader;