import { DataTypes } from "sequelize";

export const MarksModel = (sequelize) => {
  const Marks = sequelize.define("marks", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    marks: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "students",
        key: "id",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  Marks.associate = (models) => {
    Marks.belongsTo(models.Student, {
      foreignKey: "student_id",
      onDelete: "CASCADE",
    });
  };
  return Marks;
};
