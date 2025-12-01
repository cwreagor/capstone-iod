const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

// ROUTES
const authRoutes = require("./routes/authRoutes");
const flashcardRoutes = require("./routes/flashcardRoutes");

app.use("/auth", authRoutes);
app.use("/flashcards", flashcardRoutes);

// MONGO
mongoose
  .connect("mongodb://127.0.0.1:27017/studyzone")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(5001, () => console.log("Backend running on port 5001"));