import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
const app = express();

dotenv.config();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Working");
});
app.listen(PORT, () => console.log(`Listining to ${PORT}`));

mongoose
  .connect(process.env.DB_URL, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((e) => console.log(e));
