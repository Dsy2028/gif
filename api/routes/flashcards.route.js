import express from 'express';
import { getFlashcardByTopic } from '../controllers/flashcard.controller.js';

const router = express.Router();

router.get('/:topicId',getFlashcardByTopic);

export default router;