import express from "express";
import albumRouter from "./routes/album.js";
import userRouter from "./routes/user.js";
import playlistRouter from "./routes/playlist.js";

const app = express();

// JSON parser middleware
app.use(express.json());

const port = process.env.PORT || 5000;

app.use('/album', albumRouter);
app.use('/user', userRouter);
app.use('/playlist', playlistRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
