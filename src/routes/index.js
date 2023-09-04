const Course = require("../app/models/Course");
const newsRouter = require("./news");
const courseRouter = require("./courses");
const siteRouter = require("./site");
const meRouter = require("./me");

function route(app) {
  app.use("/news", newsRouter);
  app.use("/courses", courseRouter);
  app.use("/me", meRouter);

  app.use("/", siteRouter);
  app.use(function (req, res) {
    res.status(404);
    res.render("404");
  });
}
module.exports = route;
