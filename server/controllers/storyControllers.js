import mongoose from "mongoose";

import Story from "../models/Story.js";

export const getStory = async (req, res) => {
  try {
    const postStories = await Story.find();
    res.status(200).json(postStories);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addStory = async (req, res) => {
  const { caption, tags, image } = req.body;
  try {
    // const existingUser = await User.findOne(req.userId); // ?
    const storyNo = (await Story.find()).length + 1;
    const savedStory = await Story.create({
      caption,
      username: req.user.username,
      userId: req.user.id,
      creator: req.user.username,
      tags: tags.split(" "),
      image,
    //   likes: {
    //     type: [String],
    //     default: [],
    //   },
      storyNo: storyNo,
    });
    res.status(201).json({ story: savedStory });
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};


export const editStory = async (req, res) => {
    const { id: _id } = req.params; // identify the post
    const update = req.body; // apply these changes
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No update with this id available");
    try {
      // const updatedPost = await Post.findByIdAndUpdate(_id, post, {new: true});
      // res.status(203).json(updatedPost);
      const story = await Story.findById(_id);
      if (story.creator === req.user.username) { // This makes sure only creator can change it, while anyone who is authorized can see it !!! 
        const updatedStory = await Story.findByIdAndUpdate(_id, update, {
          new: true,
        });
        res.status(200).json(updatedStory);
      } else {
        res.status(203).json("not authorised");
      }
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };

  export const removeStory = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with this id ${id} available`);
    try {
      await Story.findByIdAndDelete(id);
      res.status(200).json({ message: "post has been removed" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  export const likeStory = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with this id ${id} available`);
    try {
      const story = await Story.findById(id); // id of the post
      const index = story.likes.findIndex(
        (userID) => userID === String(req.user.id)
      );
      if (index === -1) {
        story.likes.push(req.user.id);
      } else {
        story.likes = story.likes.filter(
          (userID) => userID !== String(req.user.id)
        );
      }
      const updatedStory = await Story.findByIdAndUpdate(id, story, { new: true });
      res.status(200).json(updatedStory);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  