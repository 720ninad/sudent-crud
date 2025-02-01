import { Student, Marks } from "../postgres/postgres.js";
import { sequelize } from "../postgres/postgres.js";
export const registerStudent = async (req, res) => {
  const { name, email, age, dob, marks } = req.body;
  if (!marks || marks.length === 0) {
    return res.status(400).json({ error: "Marks data is required." });
  }
  const marksData = marks.map((subject, index) => {
    if (!subject.subject || !subject.marks) {
      throw new Error(`Subject or marks missing at index ${index}`);
    }
    return {
      subject: subject.subject,
      marks: subject.marks,
    };
  });

  const t = await sequelize.transaction();
  try {
    const newStudent = await Student.create(
      {
        name,
        email,
        age,
        dob,
      },
      { transaction: t }
    );
    const marksDataWithStudentId = marksData.map((subject) => ({
      ...subject,
      student_id: newStudent.id,
    }));

    await Marks.bulkCreate(marksDataWithStudentId, { transaction: t });
    await t.commit();
    return res.status(201).json({
      message: "Student added successfully",
      user: newStudent,
    });
  } catch (error) {
    console.log("error: ", error);
    await t.rollback();
    return res
      .status(500)
      .json({ error: "Internal Server Error", error: error.message });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const students = await Student.findAndCountAll({
      include: { model: Marks },
      limit: parseInt(limit),
      offset: offset,
    });

    res.status(200).json({
      totalCount: students.count,
      totalPages: Math.ceil(students.count / parseInt(limit)),
      currentPage: parseInt(page),
      data: students.rows,
    });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ error: "Internal Server Error", error });
  }
};
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id, {
      include: { model: Marks },
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (err) {
    console.log("err: ", err);
    res.status(500).json({ message: err.message });
  }
};
export const updateStudent = async (req, res) => {
  const studentId = req.params.id;
  const { name, email, age, dob, marks } = req.body;
  const t = await sequelize.transaction();

  try {
    const student = await Student.findOne({
      where: { id: studentId },
      transaction: t,
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Update student data
    await Student.update(
      { name, email, age, dob },
      {
        where: { id: studentId },
        transaction: t,
      }
    );

    if (marks && marks.length > 0) {
      await Marks.destroy({
        where: { student_id: studentId },
        transaction: t,
      });
      const marksData = marks.map((subject) => ({
        subject: subject.subject,
        marks:
          typeof subject.marks === "string"
            ? parseInt(subject.marks, 10)
            : subject.marks,
        student_id: studentId,
      }));

      await Marks.bulkCreate(marksData, { transaction: t });
    }
    await t.commit();

    return res.status(200).json({ message: "Student updated successfully" });
  } catch (error) {
    console.log("error: ", error);
    await t.rollback();
    return res.status(500).json({ error: "Internal Server Error", error });
  }
};

export const deleteStudent = async (req, res) => {
  const studentId = req.params.id;
  try {
    const student = await Student.findOne({
      where: {
        id: studentId,
      },
    });
    if (student) {
      await Student.destroy({
        where: {
          id: studentId,
        },
      });
      return res.status(200).json({ message: "Student Deleted successfully" });
    } else {
      return res.status(200).json({ message: "Student Does Not Exists" });
    }
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ error: "Internal Server Error", error });
  }
};
