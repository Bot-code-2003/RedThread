import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  author: String,
  comment: String,
  authorId: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: String, //Contains the userId
  tags: [String],
  selectedFile: String,
  comments: {
    type: [commentSchema],
    default: [],
  },
  likes: {
    type: [String], //array of id's that liked the post
    default: [], //empty array.
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);
export default PostMessage;
