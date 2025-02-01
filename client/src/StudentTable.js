import React, { useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import moment from "moment";

const API_URL = "http://localhost:8000";

const StudentTable = ({
  students,
  editStudent,
  setStudents,
  fetchStudents,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const totalPages = Math.ceil(students.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const visibleStudents = students.slice(
    startIndex,
    startIndex + recordsPerPage
  );

  const deleteStudent = (id) => {
    axios
      .delete(`${API_URL}/student/${id}`)
      .then(() => {
        fetchStudents();
        const newPage =
          currentPage > 1 &&
          students.length - 1 <= (currentPage - 1) * recordsPerPage
            ? currentPage - 1
            : currentPage;
        setCurrentPage(newPage);
        setShowConfirmDialog(false);
      })
      .catch((err) => console.error("Error deleting student:", err));
  };

  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setShowConfirmDialog(true);
  };

  return (
    <div>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>DOB</th>
            <th>Subjects & Marks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {visibleStudents.map(
            (student, index) =>
              student && (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.age}</td>
                  <td>
                    {student.dob
                      ? moment(student.dob).format("DD-MM-YYYY")
                      : "-"}
                  </td>
                  <td>
                    {student.marks?.map((sub, i) => (
                      <div key={i}>
                        <strong>{sub.subject}:</strong> {sub.marks}
                      </div>
                    ))}
                  </td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => editStudent(student)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteClick(student)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>

      <Modal
        show={showConfirmDialog}
        onHide={() => setShowConfirmDialog(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this student?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmDialog(false)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              deleteStudent(studentToDelete.id);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="d-flex justify-content-between align-items-center">
        <div>Total Records: {students.length}</div>
        <nav>
          <ul className="pagination mb-0">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
            </li>
            {[...Array(totalPages)].map((_, i) => (
              <li
                key={i}
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default StudentTable;
