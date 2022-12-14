if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");
const routes = require("./routes/index");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", routes);

app.listen(port, () => {
  console.log("start di port", port);
});
