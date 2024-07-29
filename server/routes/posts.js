import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostBySearch,
  getPost,
  commentPost,
  deleteComment,
} from "../controllers/posts.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/search", getPostBySearch);
router.get("/:page", getPosts);
router.get("/details/:id", getPost);
router.post("/", auth, createPost);
router.post("/:id/comment", auth, commentPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/comment/:commentId", auth, deleteComment);
router.patch("/:id/likePost", auth, likePost);

export default router;
