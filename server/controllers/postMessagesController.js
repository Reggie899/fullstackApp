import {Post} from "../models/Post.js";

/**
 *
 * @param {GET} req
 * @param {Response} res
 * @returns {posts}
 * @description see all posts
 */

export const getPosts = (req, res) => {
  res.json({
    id: req.userId,
    message: "all posted messages",
  });
};

/**
 *
 * @param {POST} req
 * @param {Response} res
 * @returns {new Post using the Post schema}
 * @description create a post
 */

export const addPost = async (req, res) => {
  const { title, message, creator } = req.body;
  try {
    // const existingUser = await User.findOne(req.userId); // ?
    const postNo = (await Post.find()).length + 1;
    const savedPost = await Post.create({
      title,
      message,
      creator,
      postNo: postNo,
    });
    res.status(200).json({ post: savedPost });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong:", error: err.message });
  }
};

/**
 *
 * @param {GET} req
 * @param {Response} res
 * @returns {find a post with number}
 * @description find a post
 */

export const findPost = async (req, res) => {
    const { postNo } = req.params;
    const foundPost = await Post.findByPostNo(postNo);


  res.json(
      {
    found: foundPost
  }
  );
};

/**
 *
 * @param {POST} req
 * @param {Response} res
 * @returns {changes a post }
 * @description edit a post
 */

export const editPost = (req, res) => {
  res.json({
    id: req.userId,
    message: "all posted messages",
  });
};

export const removePost = (req, res) => {
  res.json({
    id: req.userId,
    message: "all posted messages",
  });
};
