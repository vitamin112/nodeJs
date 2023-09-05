const courses = require("../models/Course");
const { MoongooseObject, listMoongooseObject } = require("../../util/moogoose");
const Course = require("../models/Course");

class MeController {
  // [GET] /me
  index(req, res, next) {
    res.render("me/stored");
  }

  // [GET] /me/stored
  stored(req, res, next) {
    let coursesQuery = courses.find({});

    if (req.query.hasOwnProperty("_sort")) {
      coursesQuery = coursesQuery.sort({
        [req.query.column]: req.query.type,
      });
    }

    Promise.all([coursesQuery, courses.countDocumentsDeleted()])
      .then(([Courses, deletedCount]) =>
        res.render("me/stored", {
          Courses: listMoongooseObject(Courses),
          deletedCount,
        })
      )
      .catch(next);
  }

  // [GET] /me/trash
  trashCourses(req, res, next) {
    let coursesQuery = courses.findWithDeleted({ deleted: true });

    if (req.query.hasOwnProperty("_sort")) {
      coursesQuery = coursesQuery.sort({
        [req.query.column]: req.query.type,
      });
    }

    coursesQuery
      .then((Courses) =>
        res.render("me/trash", { Courses: listMoongooseObject(Courses) })
      )
      .catch(next);
  }
}
module.exports = new MeController();
