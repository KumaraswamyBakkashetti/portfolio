const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();

/* ---------- Security & Middleware ---------- */

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(helmet());
app.use(cors());
app.use(limiter);
app.use(express.json({ limit: "10kb" }));

/* ---------- Database ---------- */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

/* ---------- Routes ---------- */

app.get("/", (req, res) => {
  res.send("Portfolio Backend Running");
});

app.use("/api/contact", require("./routes/contactRoutes"));

/* ---------- Server ---------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
