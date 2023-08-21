const mongoose = require("mongoose");

const server = "127.0.0.1:27017";
const database = "toAppDb";
class Database {
  constructor() {
    this._connect();
  }
  _connect() {
    mongoose
      .connect(`mongodb://${server}/${database}`)
      .then(() => {
        console.log("Database connection successful");
      })
      .catch((err) => {
        console.error("Database connection failed");
      });
  }
}

const todoSchema = new mongoose.Schema({
  name: String,
  status: String,
});

module.exports = {
  database: new Database(),
  todoSchema,
};
