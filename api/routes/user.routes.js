import express from 'express';
import {test, updateUser, deleteUser, updateQuizResults, completedAssignments, updateLessonCompletion, get, posAward, getAllUsers, deleteUsers, updateUsers} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verify.js';
//import UserResult from '../models/user.model.js';

const router = express.Router();

//router.get('/', test);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.post('/updateQuizResults', verifyToken, updateQuizResults);
router.post('/harderQuestions/:harderQuestionsId', verifyToken, completedAssignments);
router.post('/:topicId/:part' , verifyToken, updateLessonCompletion);
router.put('/:topicId/:part' , verifyToken, updateLessonCompletion);
router.get('/get' , verifyToken, get)
router.post('/award', verifyToken, posAward)
router.get('/getUsers', getAllUsers)
router.delete('/delete/users/user', deleteUsers )
router.post('/update/users/user', updateUsers)
export default router;