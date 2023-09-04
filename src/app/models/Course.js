const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");
const slug = require("mongoose-slug-generator");

const Course = new Schema(
  {
    name: { type: String, maxLength: 255 },
    description: { type: String, maxLength: 255 },
    image: { type: String, maxLength: 255 },
    date: { type: Date, default: Date.now() },
    slug: { type: String, maxLength: 255, slug: "name", unique: true },
  },
  {
    timestamps: true,
  }
);

Course.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});
mongoose.plugin(slug);

module.exports = mongoose.model("Course", Course);
