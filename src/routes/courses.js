const express = require("express");
const router = express.Router();

const CourseController = require("../app/controllers/CourseController");

router.get("/create", CourseController.create);
router.post("/multiDeleteCourses", CourseController.multiDeleteCourses);
router.post("/handleTrashCourses", CourseController.handleTrashCourses);
router.post("/store", CourseController.store);
router.get("/:id", CourseController.show);
router.put("/:id", CourseController.update);
router.delete("/:id", CourseController.delete);
router.get("/:id/edit", CourseController.edit);
router.patch("/:id/restore", CourseController.restore);
router.delete("/:id/force", CourseController.force);
router.get("/", CourseController.index);

module.exports = router;
