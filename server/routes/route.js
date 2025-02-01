import express from "express";
import {
  deleteStudent,
  getAllStudents,
  getStudentById,
  registerStudent,
  updateStudent,
} from "../controller/student.controller.js";
import {
  addMarks,
  deleteMarks,
  getAllMarks,
  getMarksByStudentId,
  updateMarks,
} from "../controller/marks.controller.js";

const router = express.Router();
router.post("/student", registerStudent);
router.get("/student", getAllStudents);
router.get("/student/:id", getStudentById);
router.put("/student/:id", updateStudent);
router.delete("/student/:id", deleteStudent);

router.post("/marks", addMarks);
router.get("/marks", getAllMarks);
router.get("/marks/:student_id", getMarksByStudentId);
router.put("/marks/:id", updateMarks);
router.delete("/marks/:id", deleteMarks);
export default router;
