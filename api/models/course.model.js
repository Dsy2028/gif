import mongoose from 'mongoose';



const CourseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true
  },
  units: [
    {
      unitName: String,
      topics:  [String]
    }
  ]
});

const courses = mongoose.model('courses', CourseSchema);

export default courses;