import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
export const test = (req,res)=>{
    res.send('hello node api')
}

export const updateUser = async (req,res, next)=> {
    if(req.user.id !== req.params.id) return next(errorHandler(401, 'You can only update your account'));
    console.log(req.user);
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