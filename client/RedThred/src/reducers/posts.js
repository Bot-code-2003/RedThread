export default (posts = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      const newPosts = action.payload.data.filter(
        (newPost) => !posts.some((post) => post._id === newPost._id)
        //The some() method checks if at least one element in the array (posts) satisfies the condition provided by the callback function.
      );
      return [...posts, ...newPosts]; // Append new unique posts to existing ones
    case "CREATE":
      return [action.payload, ...posts];
    case "UPDATE":
    case "LIKE":
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case "DELETE":
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
};
