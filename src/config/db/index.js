const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1/database");
  } catch (error) {
    next(error);
  }
}

module.exports = { connect };
