import courses from '../models/course.model.js';

export const getCourseByName = async (req, res, next) => {
  const courseName = req.params.courseName;

  try {
    const course = await courses.findOne({ courseName: courseName });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    next(error);
  }
};