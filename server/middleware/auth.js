import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    console.log("rEQ.headers: ", req.headers);
    const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
    const isCustomToken = token.length < 500;
    let decodedData;
    if (isCustomToken && token) {
      decodedData = jwt.verify(token, "test");
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    // console.log(token);
    console.log(`Middleware error: ${error}`);
  }
};

export default auth;
