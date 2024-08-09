import React, { useState } from "react";
import { addCourseToStudent, updateStudent } from "../services/studentService";
import { Modal, Button } from "react-bootstrap";

const StudentDetails = ({ student, onClose, courses }) => {
    const [selectedCourseId, setSelectedCourseId] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState(student.name);
    const [email, setEmail] = useState(student.email);
    const [dateOfBirth, setDateOfBirth] = useState(student.dateOfBirth);
    const [enrollmentDate, setEnrollmentDate] = useState(student.enrollmentDate);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleAddCourse = async () => {
        if (selectedCourseId) {
            try {
                await addCourseToStudent(student.studentId, selectedCourseId);
                alert("Ders başarıyla eklendi!");
            } catch (error) {
                console.error("Error adding course:", error);
                alert("Failed to add course.");
            }
        } else {
            alert("Lütfen ders seçiniz");
        }
    };

    const handleEditStudent = async () => {
        try {
            await updateStudent(student.studentId, { name, email, dateOfBirth, enrollmentDate });
            alert("Student updated successfully!");
            setEditMode(false);
            setShowEditModal(false);
        } catch (error) {
            console.error("Error updating student:", error);
            alert("Failed to update student.");
        }
    };

    const handleEditMode = () => {
        setShowEditModal(true);
    };

    const handleCancel = () => {
        setEditMode(false);
        setName(student.name);
        setEmail(student.email);
        setDateOfBirth(student.dateOfBirth);
        setEnrollmentDate(student.enrollmentDate);
        setShowEditModal(false);
    };

    if (!student) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>{student.name}'s Details</h2>
                <p><strong>Email:</strong> {student.email}</p>
                <p><strong>Date of Birth:</strong> {new Date(student.dateOfBirth).toLocaleDateString()}</p>
                <p><strong>Enrollment Date:</strong> {new Date(student.enrollmentDate).toLocaleDateString()}</p>
                <h3>Courses:</h3>
                <ul>
                    {student.studentCourses && student.studentCourses.length > 0 ? (
                        student.studentCourses.map(sc => (
                            sc.courseName ? <li key={sc.courseId}>{sc.courseName}</li> : <li key={sc.courseId}>Course information not available</li>
                        ))
                    ) : (
                        <li>No courses available</li>
                    )}
                </ul>
                <h3>Add Course</h3>
                <select value={selectedCourseId} onChange={(e) => setSelectedCourseId(e.target.value)}>
                    <option value="">Select a course</option>
                    {courses.map(course => (
                        <option key={course.courseId} value={course.courseId}>{course.name}</option>
                    ))}
                </select>
                <button onClick={handleAddCourse}>Add Course</button>
                <button onClick={handleEditMode}>Edit</button>
            </div>

            <Modal show={showEditModal} onHide={handleCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit {student.name}'s Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                    <input type="date" value={enrollmentDate} onChange={(e) => setEnrollmentDate(e.target.value)} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleEditStudent}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default StudentDetails;