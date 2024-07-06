import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";

const app = express();

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes); // Use the postRoutes with /posts as base endpoint.
const CONNECTION_URL =
  "mongodb+srv://BotDeveloper:botdeveloper@redthread.evpjk7b.mongodb.net/?retryWrites=true&w=majority&appName=RedThread";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    })
  )
  .catch((err) => console.log(err.message));
