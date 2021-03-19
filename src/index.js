import express from "express";
const app = express();
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import router from "./auth/authRoutes";

//configuration
dotenv.config();
const PORT = process.env.PORT || 8000;

//middlewares
app.use(
  cors({
    origin: [`${process.env.HOST}`],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/auth", router);
//testing
app.get("/", (req, res) => {
  res.send("Working");
});

//connections
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
