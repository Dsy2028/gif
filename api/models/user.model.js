import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: 'string',
     //   required: true,
        
    },
    lastName: {
        type: 'string',
      //  required: true,
        
    },
    email: {
        type: 'string',
        required: true,
        unique: true,
    },
    password:{
        type: 'string',
        required: true,
    },
    avatar:{
        type: String,
        default: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAB+CAMAAADV/VW6AAAAM1BMVEXk5ueutLepr7Lb3uDn6erX2tvKztCxt7rh4+TFycu/xMa6v8LP09S1ur3S1dfq7O2jqq6QB599AAACvUlEQVRoge2a25brIAiGPeAhGuO8/9PuJNPptLMahRTStfbyv8jtB4ioEKWGhoaGhoaGhoaGhoaeBAAfAqto3ey9n21UFxuxsn0u5iZdklMXGlBdXqGPMnq6ygCw5Zl9syBdYQCo9Aq+axHnH7h+D4Aw3R2yd34Rph+7/q3wUbokH2wXviqL5V/B4M0kw4fjHffMdyJ4xMLfVAXoNWDpxvOHHxa081qz0xWg8k7KfbAE5zV78YNEoPMnf0Qn3q7EHH38rtvFXHrBk+haW1Z8JeT9JrOw4hVt6bXmLfyWis+shRd11D4qsOLbd6xXYg0+cd/9b3gqnRf/4dQj43k33ofLDrnozpx0BRPRe+YDn3rgRl58pDnPnHnUyxbzeUu7Z7PHXtG2Hv8zDzzefcPvvKp4vMQbF7/6RuSFDRlJF2pwIfc+9xPjR7jwCzZ3ZgRfIOvv/P7us5Kdze5jS5S+rX+DbYpg5G/8mI8WQKKn88KAWb9sqOd4TUcflP/b1jY6u+vmGaBcCvo20Vi/YbIXj3OqsotPqybvrmarbYRWf3UhHirsI7SUcwmbSt4i4KKq0kaAis6nsC37n0mW0SFkv9ogZgIo63MwrbJrdJmcEjABqp0C6r6x7sGFOReq9S9LzZEFJlm+iz445D3nUWXhWYMVTm5t7CHgMKBxwiAMeLMQA0yn4bsBbx1DzcMdacAbhzBydNXml3MBgNgYFpN05t7fGRZTdGKwWAkvyj4/EYsQ5T2LEW2wy02n/ViAes1Q+Wj/MWN6On/Crj+xi4Xlzzj/gdpAxfJRTyD2tLsLlf5Rio4KP7aFckrd8Itk/Y/61VfU+b775LEFSb3Tn9y3Jyp0oi9L740Z+A75AzWTjzymJ6s5YKNOjOj6anlP6FqflGn91iBXcO9qFV73ZaTVyr1oxSXeeBwaGhoaOtI/an4fum6Yhj8AAAAASUVORK5CYII="
    },
    role:{
        type: String,
        enum: ["student", "teacher", "admin"],
        default: "student",
    },
    quizResults: [
        {
            quizId: {
                type: mongoose.Schema.Types.ObjectId,
              //  ref: 'topics', 
            },
            correctAnswers: {
                type: Number,
                required: true,
            },
            totalQuestions: {
                type: Number,
                required: true,
            },
            answers: [String], 
            timestamp: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    completed: [
        {
            _id: false,
            assignment: [
                {
                    type: mongoose.Schema.Types.ObjectId, ref: 'topics',
                },
            ],
            timestamp: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    completedLessons: [
        {
          lessonId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'topics',
          },
          intro: { type: Boolean, default: false },
          recap: { type: Boolean, default: false },
          practice: { type: Boolean, default: false },
          review: { type: Boolean, default: false },
          quiz: { type: Boolean, default: false },
          completed: { type: Boolean, default: false },
        },
      ],
      awards: [
        {
          lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'lessons' },
          award: { type: String }
        }
      ],
    ip: {
        type: String,
       // required: true,
    },
    classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'class' }],
},{timestamps: true});

userSchema.methods.updateLessonCompletion = function(lessonId) {
    const lesson = this.completedLessons.find(lesson => lesson.lessonId.toString() === lessonId);
    if (lesson) {
      lesson.completed = lesson.intro && lesson.recap && lesson.practice && lesson.review && lesson.quiz;
      this.markModified('completedLessons');
    }
  };

const User = mongoose.model('User', userSchema);


    export default  User;
