import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
    topic_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'topics', 
      required: true,
    },
    courseName: {
        type: String
    },
    lessonName: {
      type: String,
      required: true,
    },
    lessonDescription: {
      type: String
    },
    lessons: {
      intro: {
        title: String,
        link: String,
        icon: String,
        position: String,
        backgroundColor: String,
        borderRadius: String,
      },
      recap: {
        title: String,
        link: String,
        icon: String,
        position: String,
        marginLeft: String,
        marginTop: String,
        backgroundColor: String,
        borderRadius: String,
      },
      practice: {
        questions: {
          title: String,
          link: String,
          icon: String,
          position: String,
          marginLeft: String,
          marginTop: String,
          backgroundColor: String,
          borderRadius: String,
        },
        'practice-questions2': {
          title: String,
          link: String,
          icon: String,
          position: String,
          marginLeft: String,
          marginTop: String,
          backgroundColor: String,
          borderRadius: String,
        },
      },
      review: {
        title: String,
        link: String,
        icon: String,
        position: String,
        marginLeft: String,
        marginTop: String,
        backgroundColor: String,
        borderRadius: String,
      },
      quiz: {
        title: String,
        link: String,
        icon: String,
        position: String,
        marginLeft: String,
        marginTop: String,
        backgroundColor: String,
        borderRadius: String,
      },
    },
  });

  const lessons = mongoose.model('lessons', lessonSchema);

  export default lessons;