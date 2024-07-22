import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
    const isCustomToken = token.length < 500;
    let decodedData;
    console.log("DecodedData: ", jwt.verify(token, "test"));
    /**
     *
     * jwt.verify(token, "test"): Used for custom tokens where you need to
     * ensure the token’s integrity and validity using your own secret key.
     *
     * jwt.decode(token): Used for third-party OAuth tokens to extract data
     * without verifying the token, as verification is handled by the OAuth
     * provider’s API.
     */
    if (isCustomToken && token) {
      decodedData = jwt.verify(token, "test");
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      console.log(decodedData);
      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.log(`Middleware error: ${error}`);
  }
};

export default auth;
