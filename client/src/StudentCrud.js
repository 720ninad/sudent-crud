import React, { useEffect, useState } from "react";
import StudentTable from "./StudentTable";
import axios from "axios";
import StudentForm from "./StudentForm.js";

const API_URL = "http://localhost:8000";

const StudentCrud = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = () => {
    axios
      .get(`${API_URL}/student`)
      .then((res) => setStudents(res.data.data))
      .catch((err) => console.error("Error fetching students:", err));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    age: "",
    dob: "",
    marks: [{ subject: "", marks: "" }],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (student) => {
    setFormData(
      student || {
        id: "",
        name: "",
        email: "",
        age: "",
        dob: "",
        marks: [{ subject: "", marks: "" }],
      }
    );
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSave = (studentData) => {
    setStudents([...students, studentData]);
    closeModal();
    fetchStudents();
  };

  return (
    <div className="container mt-4">
      <button className="btn btn-primary mb-3" onClick={() => openModal()}>
        Add Student
      </button>

      <StudentTable
        students={students}
        editStudent={openModal}
        setStudents={setStudents}
        fetchStudents={fetchStudents}
      />
      <StudentForm
        show={isModalOpen}
        handleClose={closeModal}
        student={formData}
        refreshStudents={handleSave}
      />
    </div>
  );
};

export default StudentCrud;
