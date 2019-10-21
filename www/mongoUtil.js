const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://dhanraj:D8899@cluster0-abnij.mongodb.net/mydb?retryWrites=true&w=majority";

var _db;

module.exports = {
  connectToServer: function(callback) {
    const client = MongoClient.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function(err, client) {
        if (err) {
          console.log(err);
        } else {
          _db = client.db("mydb");
          return callback(err);
        }
      }
    );
  },

  getDb: function() {
    return _db;
  }
};
