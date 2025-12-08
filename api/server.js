import express from "express";
import albumRouter from "./routes/album.js";

const app = express();

// JSON parser middleware
app.use(express.json());

const port = process.env.PORT || 5000;

app.use('/album', albumRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
