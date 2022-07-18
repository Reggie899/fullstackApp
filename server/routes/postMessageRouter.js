import {Router} from 'express';

import auth from '../middlewares/auth.js'
import {getPosts, addPost, editPost,removePost, findPost } from '../controllers/postMessagesController.js';

const router = Router();

router.get('/getposts', auth, getPosts);
router.post('/getposts', auth, addPost);
router.get('/findpost/:postNo', auth, findPost);
router.put('/getposts', auth, editPost);
router.delete('/getposts', auth, removePost);


export default router;