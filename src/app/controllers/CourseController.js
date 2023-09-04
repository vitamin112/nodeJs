const courses = require("../models/Course");
const { MoongooseObject, listMoongooseObject } = require("../../util/moogoose");

class CourseController {
  // [GET] /course
  index(req, res, next) {
    courses
      .find({})
      .then((Courses) =>
        res.render("home", {
          Courses: listMoongooseObject(Courses),
        })
      )
      .catch(next);
  }

  // [GET] /course/:slug
  show(req, res, next) {
    courses
      .findOne({ _id: req.params.id })
      .lean()
      .then((course) => {
        res.render("courses/show", { course });
      })
      .catch(next);
  }

  // [GET] /course/creare
  create(req, res, next) {
    res.render("courses/create");
  }

  // [POST] /course/store
  store(req, res, next) {
    const NewCourse = new courses(req.body);
    NewCourse.save()
      .then(() => res.redirect("/"))
      .catch(next);
  }

  // [GET] /course/edit
  edit(req, res, next) {
    courses
      .findOne({ _id: req.params.id })
      .then((course) =>
        res.render("courses/edit", { course: MoongooseObject(course) })
      )
      .catch(next);
  }

  // [PUT] /course/:id
  update(req, res, next) {
    courses
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/me/stored/courses"))
      .catch(next);
  }

  // [DELETE] /course/:id
  delete(req, res, next) {
    courses
      .delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  // [DELETE] /course/:id/force
  force(req, res, next) {
    courses
      .deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  // [PATCH] /courses/:id/restore
  restore(req, res, next) {
    courses
      .restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  // [POST] /courses/:id/restore
  multiDeleteCourses(req, res, next) {
    courses
      .delete({ _id: { $in: req.body.selectItems } })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  // [POST] /courses/:id/restore
  handleTrashCourses(req, res, next) {
    switch (req.body.action) {
      case "delete":
        courses
          .deleteMany({ _id: { $in: req.body.selectItems } })
          .then(() => res.redirect("back"))
          .catch(next);
        break;

      case "restore":
        courses
          .restore({ _id: { $in: req.body.selectItems } })
          .then(() => res.redirect("back"))
          .catch(next);
        break;

      default:
        res.send("error: unknown!");
        break;
    }
  }
}
module.exports = new CourseController();
