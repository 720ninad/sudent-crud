import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import moment from "moment";

const API_URL = "http://localhost:8000";

const StudentForm = ({ show, handleClose, student, refreshStudents }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    dob: "",
    marks: [],
  });

  useEffect(() => {
    if (student) {
      setFormData({
        ...student,
        dob: student.dob ? moment(student.dob).format("YYYY-MM-DD") : "",
      });
    }
  }, [student]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addSubject = () =>
    setFormData({
      ...formData,
      marks: [...formData.marks, { subject: "", marks: "" }],
    });

  const updateSubject = (index, field, value) => {
    const updatedSubjects = [...formData.marks];
    updatedSubjects[index][field] = value;
    setFormData({ ...formData, marks: updatedSubjects });
  };

  const removeSubject = (index) => {
    const updatedSubjects = formData.marks.filter((_, i) => i !== index);
    setFormData({ ...formData, marks: updatedSubjects });
  };

  const handleSubmit = (e) => {
    const payload = {
      ...formData,
      marks: formData.marks.map((ele) => ({
        subject: ele.subject,
        marks: ele.marks,
      })),
    };
    e.preventDefault();
    const request =
      student && student.id
        ? axios.put(`${API_URL}/student/${student.id}`, payload)
        : axios.post(`${API_URL}/student`, payload);
    request
      .then((data) => {
        refreshStudents(data.data.user);
        handleClose();
      })
      .catch(console.error);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{student ? "Edit Student" : "Add Student"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div>Subjects & Marks</div>
          {formData.marks.map((sub, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "10px",
              }}
            >
              <Form.Control
                type="text"
                placeholder="Subject Name"
                value={sub.subject}
                onChange={(e) =>
                  updateSubject(index, "subject", e.target.value)
                }
                required
                style={{ flex: "2" }}
              />
              <Form.Control
                type="number"
                placeholder="Marks"
                value={sub.marks}
                onChange={(e) => updateSubject(index, "marks", e.target.value)}
                required
                style={{ flex: "1" }}
              />
              <Button
                variant="danger"
                onClick={() => removeSubject(index)}
                style={{ flex: "0.5" }}
              >
                Remove
              </Button>
            </div>
          ))}

          <Button
            variant="primary"
            onClick={addSubject}
            style={{ marginBottom: "10px" }}
          >
            Add Subject
          </Button>

          <div style={{ textAlign: "right", marginTop: "20px" }}>
            <Button
              variant="secondary"
              onClick={handleClose}
              style={{ marginRight: "10px" }}
            >
              Cancel
            </Button>
            <Button variant="success" type="submit">
              Save
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default StudentForm;
