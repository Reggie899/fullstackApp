import {Router} from 'express';

import auth from '../middlewares/auth.js'
import {getPosts, addPost, editPost,removePost, findPost, likePost } from '../controllers/postMessagesController.js';

const router = Router();

router.get('/getposts', auth, getPosts);
router.post('/addposts', auth, addPost);
router.get('/findpost/:postNo', auth, findPost);
router.put('/editpost/:id', auth, editPost);
router.delete('/removepost/:id', auth, removePost);
router.put('/likepost/:id', auth, likePost);


export default router;