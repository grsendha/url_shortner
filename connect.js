const mongoose = require("mongoose");

async function connectToMongoDB(url) {
  return mongoose
    .connect(url)
    .then(() => console.log("Database Connected"))
    .catch((e) => console.log(e));
}

module.exports = {
  connectToMongoDB,
};
