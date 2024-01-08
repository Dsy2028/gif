import mongoose from 'mongoose';


const CourseSchema = new mongoose.Schema({
    courseName: {
      type: String,
      required: true
    },
    units: [{ type: mongoose.Schema.Types.ObjectId, ref: 'units'}]
  });
  
  const otherTest = mongoose.model('test', CourseSchema);
  
  export default otherTest;