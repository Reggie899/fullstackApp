import mongoose from "mongoose";


import {Post} from "../models/Post.js";


export const getPosts = async (req, res) => {
    try {
      const postMessages = await Post.find();
      res.status(200).json(postMessages);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };

export const addPost = async (req, res) => {
  const { title, message, name, tags } = req.body;
  try {
    // const existingUser = await User.findOne(req.userId); // ?
    const postNo = (await Post.find()).length + 1;
    const savedPost = await Post.create({
      title,
      message,
      name,
      creator: req.user.username,
      tags: tags.split(" "),
      postNo: postNo,
    });
    res.status(201).json({ post: savedPost });
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const findPost = async (req, res) => {
    const { postNo } = req.params;
    const foundPost = await Post.findByPostNo(postNo);


  res.json(
      {
    found: foundPost
  }
  );
};



export const editPost = async (req, res) => {
    const { id: _id } = req.params; // identify the post
    const update = req.body; // apply these changes
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No update with this id available");
    try {
      // const updatedPost = await Post.findByIdAndUpdate(_id, post, {new: true});
      // res.status(203).json(updatedPost);
      const post = await Post.findById(_id);
      if (post.creator === req.user.username) { // This makes sure only creator can change it, while anyone who is authorized can see it !!! 
        const updatedPost = await Post.findByIdAndUpdate(_id, update, {
          new: true,
        });
        res.status(200).json(updatedPost);
      } else {
        res.status(203).json("not authorised");
      }
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };

  export const removePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with this id ${id} available`);
    try {
      await Post.findByIdAndDelete(id);
      res.status(200).json({ message: "post has been removed" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  export const likePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with this id ${id} available`);
    try {
      const post = await Post.findById(id); // id of the post
      const index = post.likes.findIndex(
        (userID) => userID === String(req.user.id)
      );
      if (index === -1) {
        post.likes.push(req.user.id);
      } else {
        post.likes = post.likes.filter(
          (userID) => userID !== String(req.user.id)
        );
      }
      const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
