import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
export const test = (req,res)=>{
    res.send('hello node api')
}

export const updateUser = async (req,res, next)=> {
    if(req.user.id !== req.params.id) return next(errorHandler(401, 'You can only update your account'));
   
    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        const updateUser = await User.findByIdAndUpdate(req.params.id,{
            $set:{
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        }, {new: true})
        const {password, ...rest} = updateUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error)
    }
}

export const get = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId).populate({
      path: 'classes',
      populate: [
        {
          path: 'teacher',
          select: 'firstName email lastName avatar'
        },
        {
          path: 'courses',

          select: 'courseName units',
          populate: {
            path: 'units', 
           select: 'name topics',
           populate:{
            path: 'topics'
           }
          }

        }
      ]
    }).populate({
      path: 'completedLessons',
      populate:{ 
        path: 'lessonId',
        select: 'topicName'
      }
    })
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

   
    const { password, ...userWithoutPassword } = user._doc;

    res.json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) =>{
  try {
    const allUsers = await User.find();
  if (!allUsers) {
    return res.status(404).json({ message: 'No Users Found' });
  }

 
  //const { password, ...userWithoutPassword } = allUsers._doc;

  res.status(200).json(allUsers);
  } catch (error) {
    next(error)
  }
}


export const updateQuizResults = async (req, res,next) => {
  try {
    const { quizId, correctAnswers, totalQuestions, answers } = req.body;
    //if(req.user._id !== req.params._id) return next(errorHandler(403, 'Forbidden'));
    console.log('user',req.user);
    console.log('user id',req.user.id);


    const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        {
          $push: {
            quizResults: {
              quizId,
              correctAnswers,
              totalQuestions,
              answers,
            },
          },
        },
        { new: true }
      );
      console.log(req.user.id)
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Quiz results updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating quiz results:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only delete your own account!'));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json('User has been deleted!');
  } catch (error) {
    next(error);
  }
};

export const deleteUsers = async (req, res) => {
  try {
    const user = req.body;
    await User.findByIdAndDelete(user._id);
    res.status(200).json('User has been deleted!');
  } catch (error) {
    console.error('error deleteing user', error)
    res.status(500).json({message: 'Internal Server Error'})
  }
}



export const getUserResults =  async (req, res) => {
  try{
  const { quizId } = req.user.quizId;
  const { quizResults } = req.user;
  const {answers} = req.user.answers;

  const quizResult = quizResults.find((result) => result.quizId === quizId);

  if (!quizResult) {
    return res.status(404).json({ message: 'Quiz result not found' });
  }
  res.status(200).json({ quizResult });
}
  catch(error){
    console.error('Error getting quiz results:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const completedAssignments = async (req, res) => {
  try {
    const userId = req.user.id; 
    const {  harderQuestionsId } = req.params; 
    console.log(harderQuestionsId)

    const completedAssignment = await User.findByIdAndUpdate(
      req.user.id,
      {
        $push: {
          completed: {
            assignment: harderQuestionsId,
          },
        },
      },
      { new: true }
    );
    
    if (!userId) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'added completed assignment', user: userId});

  } catch (error) {
    console.error('Error getting completed assignments:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const updateLessonCompletion = async (req, res, next) => {
  const userId = req.user.id;
  const { topicId, part } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    let lesson = user.completedLessons.find((lesson) => lesson.lessonId.toString() === topicId);
    if (!lesson && req.method === 'POST') {
      user.completedLessons.push({ lessonId: topicId, [part]: true });
    } else if (lesson && req.method === 'PUT') {
      lesson[part] = true;
      user.markModified('completedLessons');
    } else {
      return res.status(400).json({ message: 'Invalid request' });
    }
    user.updateLessonCompletion(topicId);
    const updatedUser = await user.save();
    res.status(200).json({ message: 'Lesson part completion updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating lesson part completion:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


export const getComplete =  async (req, res) => {
  try{
  const { quizId } = req.user.quizId;
  const { quizResults } = req.user;
  const {answers} = req.user.answers;

  const quizResult = quizResults.find((result) => result.quizId === quizId);

  if (!quizResult) {
    return res.status(404).json({ message: 'Quiz result not found' });
  }
  res.status(200).json({ quizResult });
}
  catch(error){
    console.error('Error getting quiz results:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const posAward = async (req, res) => {
  try {
    const { lessonId, award } = req.body;
    const se = await User.findByIdAndUpdate(
      req.user.id,
      {
        $push: {
          awards: { lessonId, award },
        },
      },
      { new: true }
    )
    if(!se){
      return res.status(404).json({ message: 'User not found cannot post award' });
    }
    res.status(200).json(se);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' });
   
  }
}
