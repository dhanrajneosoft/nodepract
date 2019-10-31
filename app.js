require("dotenv").config(); // Sets up dotenv as soon as our application starts

const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
const routes = require("./routes/index");
const environment = "development"; // development
const stage = require("./config")[environment];
require('./models/mongoose.db');
app.use(bodyParser.json());
app.use(express.static('uploads'))
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
if (environment !== "production") {
  app.use(logger("dev"));
}
app.use("/api/v1", routes(router));
app.listen( process.env.PORT || stage.port, () => {
  // console.log(`Server now listening at localhost: ${stage.port}`);
});
module.exports = app;
