import mongoose from 'mongoose';



const CourseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true
  },
  units: [
    {
      unitName: String,
      topics: [String]
    }
  ]
});

const Course = mongoose.model('Courses', CourseSchema);

export default Course;