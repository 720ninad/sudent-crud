import { Sequelize } from "sequelize";
import { StudentModel } from "../model/student-schema.js";
import { MarksModel } from "../model/marks-schema.js";

export const sequelize = new Sequelize("student", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
});

let Student, Marks;
const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    Student = await StudentModel(sequelize);
    Marks = await MarksModel(sequelize);

    Student.hasMany(Marks, { foreignKey: "student_id" });
    Marks.belongsTo(Student, { foreignKey: "student_id" });

    await sequelize.sync();
    console.log("Database Sync");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { connection, Student, Marks };
