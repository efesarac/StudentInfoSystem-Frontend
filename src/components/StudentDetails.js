import React, { useState } from "react";
import { addCourseToStudent, updateStudent } from "../services/studentService";
import { Modal, Button } from "react-bootstrap";

const StudentDetails = ({ student, onClose, courses }) => {
    const [selectedCourseId, setSelectedCourseId] = useState("");
    const [name, setName] = useState(student.name);
    const [email, setEmail] = useState(student.email);
    const [dateOfBirth, setDateOfBirth] = useState(student.dateOfBirth);
    const [enrollmentDate, setEnrollmentDate] = useState(student.enrollmentDate);
    const [showEditModal, setShowEditModal] = useState(false);
    const [studentCourses, setStudentsCourses] = useState(student.studentCourses || []);
    
    
    
    const handleAddCourse = async () => {
        if (selectedCourseId) {
            const courseIdToAdd = parseInt(selectedCourseId, 10);
            await addCourseToStudent(student.studentId, selectedCourseId);
            const addedCourse = courses.find(course => course.courseId === courseIdToAdd);
            if(addedCourse){
                setStudentsCourses(prevCourses => [
                    ...prevCourses,
                    {
                        courseId: addedCourse.courseId,courseName : addedCourse.name
                    }
                ]);
            }
            alert("Ders başarıyla eklendi!");
        } 
    };

    const handleEditStudent = async () => {
        try {
            await updateStudent(student.studentId, { name, email, dateOfBirth, enrollmentDate });
            alert("Student updated successfully!");

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
        setName(student.name);
        setEmail(student.email);
        setDateOfBirth(student.dateOfBirth);
        setEnrollmentDate(student.enrollmentDate);
        setShowEditModal(false);
    };

    if (!student) return null;

    return (
        <Modal show={true} onHide={onClose}>
        <Modal.Header closeButton>
            <Modal.Title>{student.name} Detaylar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Doğum Tarihi:</strong> {new Date(student.dateOfBirth).toLocaleDateString()}</p>
            <p><strong>Kayıt Tarihi:</strong> {new Date(student.enrollmentDate).toLocaleDateString()}</p>
            <h3>Dersler:</h3>
            <ul>
                {studentCourses && studentCourses.length > 0 ? (
                    studentCourses.map(sc => (
                        sc.courseName ? <li key={sc.courseId}>{sc.courseName}</li> : <li key={sc.courseId}>Ders bilgisi mevcut değil</li>
                    ))
                ) : (
                    <li>Mevcut ders yok</li>
                )}
            </ul>
            <h3>Ders Ekle</h3>
            <select value={selectedCourseId} onChange={(e) => setSelectedCourseId(e.target.value)}>
                <option value="">Bir ders seçin</option>
                {courses.map(course => (
                    <option key={course.courseId} value={course.courseId}>{course.name}</option>
                ))}
            </select>
            <Button variant="primary" onClick={handleAddCourse} className="mt-2">
                Ders Ekle
            </Button>
            <Button variant="secondary" onClick={handleEditMode} className="mt-2">
                Düzenle
            </Button>
        </Modal.Body>
        <Modal show={showEditModal} onHide={handleCancel}>
            <Modal.Header closeButton>
                <Modal.Title>{student.name} Bilgilerini Düzenle</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control mb-2" placeholder="Ad" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control mb-2" placeholder="Email" />
                <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} className="form-control mb-2" placeholder="Doğum Tarihi" />
                <input type="date" value={enrollmentDate} onChange={(e) => setEnrollmentDate(e.target.value)} className="form-control mb-2" placeholder="Kayıt Tarihi" />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCancel}>
                    İptal
                </Button>
                <Button variant="primary" onClick={handleEditStudent}>
                    Kaydet
                </Button>
            </Modal.Footer>
        </Modal>
    </Modal>
);
    
};

export default StudentDetails;