const Course = require("../models/Course");
const { listMoongooseObject } = require("../../util/moogoose");

class SiteController {
  // [GET] '/'
  index(req, res, next) {
    Course.find({})
      .then((Courses) =>
        res.render("home", {
          Courses: listMoongooseObject(Courses),
        })
      )
      .catch(next);

    // res.render("home");
  }

  // [GET] '/search'
  search(req, res, next) {
    res.render("search");
  }
}
module.exports = new SiteController();
