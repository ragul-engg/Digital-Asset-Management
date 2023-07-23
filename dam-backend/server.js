const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const router = require("./router/router");
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});

const db_connection = mongoose.connection;

db_connection.on("error", (error) => {
  console.error(error);
});
db_connection.once("open", () => {
  console.log("db connected");
});

app.use(cors({ origin: "*" }));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use("/public/thumbnails", express.static("images"));

app.get("/images", router);

app.post("/upload", router);

app.listen(8080, () => {
  console.log("server is listening");
});
