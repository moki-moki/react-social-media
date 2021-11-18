require("dotenv").config();
const express = require("express");
const authRouter = require("./routes/auth");
const privateRouter = require("./routes/private");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

connectDB();

const app = express();

//middleware
app.use(express.json()); //Allows us to get data from req.body
app.use("/api/auth", authRouter);
app.use("/api/private", privateRouter);
app.use("/api/posts", postRouter);
app.use("/api/user", userRouter);
// app.use(helmet());
// app.use(morgan("common"));

app.get("/", (req, res) => {
  res.send("Welcome to homepage");
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Sever running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
