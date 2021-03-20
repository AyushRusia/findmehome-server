import express from "express";
const app = express();
import mongoose from "mongoose";
import { graphqlHTTP } from "express-graphql";
import schema from "./graphql/schema.js";
import resolver from "./graphql/resolver.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import router from "./auth/authRoutes.js";
import jwt from "jsonwebtoken";

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

//auth middleware
app.use("/auth", router);
//testing
app.get("/", (req, res) => {
  res.send("Working");
});

//connections
app.listen(PORT, () => console.log(`Listining to ${PORT}`));

//graphql setup

app.use("/graphql", async (req, res) => {
  const token = req.cookies.token;
  if (token) {
    const user = await jwt.verify(token, process.env.JWT_SECRET);
    req.userId = user.id;
  }

  return graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true,
  })(req, res);
});
//mongoose connection
mongoose
  .connect(process.env.DB_URL, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((e) => console.log(e));
