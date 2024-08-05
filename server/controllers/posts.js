import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

/**
 * Retrieves a paginated list of posts.
 *
 * @param {object} req - Express request object with page parameter.
 * @param {object} res - Express response object.
 */
export const getPosts = async (req, res) => {
  const { page } = req.params;
  const LIMIT = 4;
  const startIndex = (Number(page) - 1) * LIMIT;

  try {
    const total = await PostMessage.countDocuments({});
    const posts = await PostMessage.find()
      .sort({ createdAt: -1 }) // Sort posts by creation date in descending order
      .skip(startIndex) // Skip posts for previous pages
      .limit(LIMIT); // Limit the number of posts returned

    res.status(200).send({
      data: posts,
      totalPages: Math.ceil(total / LIMIT), // Calculate total number of pages
    });
  } catch (error) {
    console.error(error);
    res.status(404).send({ message: error.message }); // Send error message with details
  }
};

/**
 * Fetches a single post by its ID.
 *
 * @param {object} req - Express request object with id parameter.
 * @param {object} res - Express response object.
 */
export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * Searches for posts based on a search query and returns recommended posts.
 *
 * @param {object} req - Express request object with {String} searchQuery query parameter.
 * @param {object} res - Express response object.
 */
export const getPostBySearch = async (req, res) => {
  const { searchQuery } = req.query;

  try {
    const title = new RegExp(searchQuery, "i"); // Case-insensitive search for title
    const posts = await PostMessage.find({ title });

    // Extract unique tags from the found posts
    const tags = [
      ...new Set(
        posts.flatMap((post) =>
          post.tags.map((tag) => tag.replace("#", "").trim())
        )
      ),
    ];

    // console.log("Search query tags: ", tags); // Debugging: log the tags

    // Reconstruct the tags to match the database format
    const formattedTags = tags.map((tag) => `#${tag}`);

    // console.log("Formatted tags for query: ", formattedTags); // Debugging: log the formatted tags

    // Find recommended posts based on tags and limit to 8
    const recommendedPosts = await PostMessage.find({
      tags: { $in: formattedTags },
    });

    // Filter out the original posts from the recommended ones
    const recommendedFiltered = recommendedPosts.filter(
      (recPost) => !posts.some((post) => post._id.equals(recPost._id))
    );

    // Sort recommended posts by the number of matching tags
    const sortedRecommendedPosts = recommendedFiltered
      .map((recPost) => {
        const matchingTagsCount = recPost.tags.reduce((count, tag) => {
          if (formattedTags.includes(tag)) {
            return count + 1;
          }
          return count;
        }, 0);

        return { ...recPost.toObject(), matchingTagsCount };
      })
      .sort((a, b) => b.matchingTagsCount - a.matchingTagsCount)
      .slice(0, 8);

    // console.log("Sorted recommended posts: ", sortedRecommendedPosts); // Debugging: log the sorted recommended posts

    res.json({ data: posts, recommendedPosts: sortedRecommendedPosts });
  } catch (error) {
    console.error(error);
    res.status(404).send({ message: error.message });
  }
};

/**
 * Creates a new post in the database.
 *
 * @param {object} req - Express request object with post data in the body.
 * @param {object} res - Express response object.
 */
export const createPost = async (req, res) => {
  const post = req.body;

  try {
    const newPost = new PostMessage({
      ...post,
      creator: req.userId, // Include creator ID from request
      createdAt: new Date().toISOString(), // Set creation date automatically
    });
    await newPost.save();
    res.status(201).send(newPost);
  } catch (error) {
    console.error(error);
    res.status(409).send({ message: error.message });
  }
};

/**
 * Updates an existing post in the database.
 *
 * @param {object} req - Express request object with id and post data in the body.
 * @param {object} res - Express response object.
 */
export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with that id");
  }

  try {
    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      { ...post, _id },
      { new: true }
    );
    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(409).send({ message: error });
  }
};

/**
 * Deletes a post from the database.
 *
 * @param {object} req - Express request object with id parameter.
 * @param {object} res - Express response object.
 */
export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with that id");
  }

  try {
    await PostMessage.findByIdAndDelete(_id);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};

/**
 * Likes a post by adding the user's ID to the post's likes array.
 *
 * @param {object} req - Express request object with id parameter.
 * @param {object} res - Express response object.
 */
export const likePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  try {
    const post = await PostMessage.findById(_id);
    const index = await post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
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

/**
 * Adds a comment to a post.
 *
 * @param {object} req - Express request object with id, commentAuthor, authorId, and comment in the body.
 * @param {object} res - Express response object.
 */
export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { commentAuthor, authorId, comment } = req.body;

  try {
    const post = await PostMessage.findById(id);

    post.comments.push({
      author: commentAuthor,
      authorId: authorId,
      comment: comment,
    });

    const updatePost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.json(updatePost);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};

/**
 * Deletes a comment from a post.
 *
 * @param {object} req - Express request object with postId and commentId parameters.
 * @param {object} res - Express response object.
 */
export const deleteComment = async (req, res) => {
  const { postId, commentId } = req.params;

  try {
    const result = await PostMessage.findByIdAndUpdate(
      postId,
      { $pull: { comments: { _id: commentId } } }, // Efficiently remove the comment
      { new: true } // Return the updated post if necessary
    );

    if (!result) {
      return res.status(404).send("Post not found");
    }

    res.status(204).send(); // No content to send back
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};
