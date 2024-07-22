export default (state = { authData: null }, action) => {
  switch (action.type) {
    /**
     * Dispatch from actions/auth.js.
     * @param {object} - contains result, token.
     * returns {object} - contains authData:{result, token}.
     */
    case "AUTH":
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return { ...state, authData: action?.payload };
    default:
      return state;
  }
};
