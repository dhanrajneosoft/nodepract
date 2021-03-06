require("dotenv").config(); // Sets up dotenv as soon as our application starts

const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
const routes = require("./routes/index");
const environment = "development"; // development
const stage = require("./config")[environment];
const cors = require('cors');
require('./models/mongoose.db');
app.use(bodyParser.json());
app.use(express.static('uploads'))
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());
if (environment !== "production") {
  app.use(logger("dev"));
}
app.use("/api/v1", routes(router));
app.get('/users/[dc]{1}([0-9]|[0-3][0-9]|4[0-6])/demo', function (req, res) {
  res.send('OK');
})
app.listen(process.env.PORT || stage.port, () => {
  // console.log(`Server now listening at localhost: ${stage.port}`);
});

module.exports = app;
