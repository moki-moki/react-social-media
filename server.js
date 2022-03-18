require("dotenv").config();
const express = require("express");
const authRouter = require("./routes/auth");
const privateRouter = require("./routes/private");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const multer = require("multer");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");

connectDB();

const app = express();
app.use(express.json()); //Allows us to get data from req.body

app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "defaul-src": ["'self'"],
      "base-uri": "'self'",
      "img-src": ["'self'", "data:"],
      "script-src": ["'self'"],
      "style-src": ["'self'"],
    },
  })
);
app.use(morgan("common"));

// For file uploading
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded nice job!");
  } catch (error) {
    console.log(error);
  }
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
// app.use("/api/private", privateRouter);
app.use("/api/user", userRouter);

// HEROKU SHIT
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "/client/build", "index.html"))
  );
}

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
