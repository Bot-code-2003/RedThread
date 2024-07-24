const initialState = {
  allPosts: [],
  searchResults: [],
  recommendedPosts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ALL":
      const newPosts = action.payload.data.filter(
        (newPost) => !state.allPosts.some((post) => post._id === newPost._id)
      );
      return {
        ...state,
        allPosts: [...state.allPosts, ...newPosts],
      };
    case "FETCH_BY_SEARCH":
      // console.log("Reducer searching action: ", );
      return {
        ...state,
        searchResults: action.payload.data || [],
        recommendedPosts: action.payload.recommendedPosts || [],
      };
    case "CREATE":
      return {
        ...state,
        allPosts: [action.payload, ...state.allPosts],
      };
    case "UPDATE":
    case "LIKE":
      return {
        ...state,
        allPosts: state.allPosts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case "DELETE":
      return {
        ...state,
        allPosts: state.allPosts.filter((post) => post._id !== action.payload),
      };
    default:
      return state;
  }
};
