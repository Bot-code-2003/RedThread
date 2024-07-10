export default (state = { authData: null }, action) => {
  switch (action.type) {
    case "AUTH":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    // console.log("Displaying from reducer");
    // console.log(action?.data);
    default:
      return state;
  }
};
