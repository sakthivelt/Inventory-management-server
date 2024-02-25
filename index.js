require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const config = require("config");
const cors = require("cors");
const { userAuth, adminAuth } = require("./middleware/auth");

const corsOptions = {
  exposedHeaders: "Authorization",
};

// routes
const authRouter = require("./Routers/Auth/router");
const productRouter = require("./Routers/Products/router");

// middlewares
if (app.get("env") == "development") {
  app.use(morgan("tiny"));
  console.log("morgan enabled");
}
app.use(cors(corsOptions));
app.use(express.json());
app.use("/user", userAuth);
app.use(helmet());

const PORT = process.env.PORT || 4000;

if (app.get("env") == "production") console.log("production start");

app.get("/", (req, res) => {
  res.status(200).send("Home Route");
});

app.use("/auth", authRouter);
app.use("/products", adminAuth, productRouter);

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("DB connected"))
  .catch((error) => console.log(error));

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
