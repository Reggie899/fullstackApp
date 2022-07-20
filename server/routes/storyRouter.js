import { Router} from "express";
import authenticateToken from '../middlewares/auth.js';
import { getStory, addStory, editStory, removeStory, likeStory } from "../controllers/storyControllers.js";
import Story from "../models/Story.js";

const router = Router();

// get, add, edit, delete, likestory 

router.get('/getstory', authenticateToken, getStory);
router.post('/addstory', authenticateToken, addStory);
router.put('/editstory/:id', authenticateToken, editStory);
router.delete('/removestory/:id', authenticateToken, removeStory);
router.put('/likestory/:id', authenticateToken, likeStory);



export default router;