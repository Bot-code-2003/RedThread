import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  const { page } = req.params;

  const LIMIT = 4;
  const startIndex = (Number(page) - 1) * LIMIT; //0, 4, 8... indexes

  try {
    const total = await PostMessage.countDocuments({});
    const posts = await PostMessage.find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(LIMIT);
    console.log("totalPages: ", Math.ceil(total / LIMIT));
    res.status(200).send({
      data: posts,
      currentPage: Number(page),
      totalPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

export const getPostBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  console.log("searchQuery: ", searchQuery);
  try {
    const title = new RegExp(searchQuery, "i");
    // console.log("title: ", title);
    const posts = await PostMessage.find({ title });
    res.json({ data: posts });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    res.status(201).send(newPost);
  } catch (error) {
    res.status(409).send({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");
  try {
    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      { ...post, _id },
      {
        new: true,
      }
    );
    res.json(updatedPost);
  } catch (error) {
    res.status(409).send({ message: error });
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  try {
    await PostMessage.findByIdAndDelete(_id);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");
  try {
    const post = await PostMessage.findById(_id);
    const index = await post.likes.findIndex((id) => id === String(req.userId));
    if (index === -1) {
      // if user not in likes array then add him
      post.likes.push(req.userId);
      console.log("Like added");
    } else {
      // if user already in likes array then remove him
      console.log("Like removed");
      post.likes = post.likes.filter((id) => id !== String(req.userId)); //remember filter returns an array.
    }
    const updatePost = await PostMessage.findByIdAndUpdate(_id, post, {
      new: true,
    });
    res.json(updatePost);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};
