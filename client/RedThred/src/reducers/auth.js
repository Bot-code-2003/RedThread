export default (state = { authData: null }, action) => {
  switch (action.type) {
    case "AUTH":
      // console.log("In Reducer: ", action?.payload);
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return { ...state, authData: action?.payload };
    // console.log("Displaying from reducer");
    // console.log(action?.data);
    default:
      return state;
  }
};
