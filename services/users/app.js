if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const routes = require("./routes/index");
const { connectDb } = require("./config/mongo");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", routes);

connectDb().then((db) => {
  app.listen(port, () => {
    console.log(`udah jalan di ${port}`);
  });
});
