import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
  caption: String,
  username: String,
  userId: String,
  creator: String,
  tags: [String],
  image: String, // url path
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  storyNo: Number,
});

const Story = mongoose.model("Story", storySchema);

export default Story;
