import { Student, Marks } from "../postgres/postgres.js";

export const addMarks = async (req, res) => {
  try {
    const { student_id, subject, marks } = req.body;

    const student = await Student.findByPk(student_id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const newMarks = await Marks.create({
      student_id,
      subject,
      marks,
    });

    res
      .status(201)
      .json({ message: "Marks added successfully", data: newMarks });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllMarks = async (req, res) => {
  try {
    const marks = await Marks.findAll({
      include: { model: Student },
    });
    res.status(200).json(marks);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMarksByStudentId = async (req, res) => {
  try {
    const { student_id } = req.params;
    const marks = await Marks.findAll({
      where: { student_id },
      include: { model: Student },
    });

    if (marks.length === 0) {
      return res
        .status(404)
        .json({ message: "No marks found for this student" });
    }

    res.status(200).json(marks);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateMarks = async (req, res) => {
  try {
    const { id } = req.params;
    const { subject, marks } = req.body;

    const mark = await Marks.findByPk(id);
    if (!mark) {
      return res.status(404).json({ message: "Marks not found" });
    }

    await Marks.update({ subject, marks }, { where: { id } });

    res.status(200).json({ message: "Marks updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteMarks = async (req, res) => {
  try {
    const { id } = req.params;
    const mark = await Marks.findByPk(id);
    if (!mark) {
      return res.status(404).json({ message: "Marks not found" });
    }

    await Marks.destroy({ where: { id } });

    res.status(200).json({ message: "Marks deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
