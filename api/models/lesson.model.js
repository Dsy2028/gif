import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
    topic_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'topics', 
      required: true,
    },
    image: String,
    completion: String,
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
        completed: { type: Boolean, default: false }, 
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
        completed: { type: Boolean, default: false }, 
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
          completed: { type: Boolean, default: false }, 
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
          completed: { type: Boolean, default: false }, 
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
        completed: { type: Boolean, default: false }, 
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
        completed: { type: Boolean, default: false }, 
      },
    },
  });

  const lessons = mongoose.model('lessons', lessonSchema);

  export default lessons;