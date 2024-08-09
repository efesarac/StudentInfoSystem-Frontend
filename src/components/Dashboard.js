import React, { useEffect, useState } from 'react';
import { createStudent, getStudents, deleteStudent, updateStudent } from '../services/studentService';
import { getCourses, createCourse, deleteCourse, updateCourse } from '../services/courseService';
import { Modal, Button } from "react-bootstrap";
import StudentDetails from './StudentDetails';
import CourseDetails from './CourseDetails';
import './Dashboard.css';

const Dashboard = () => {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [editStudent, setEditStudent] = useState(null);
    const [editCourse, setEditCourse] = useState(null);

    useEffect(() => {
        fetchStudents();
        fetchCourses();
    }, []);

    const fetchStudents = async () => {
        try {
            const data = await getStudents();
            setStudents(data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const fetchCourses = async () => {
        try {
            const data = await getCourses();
            setCourses(data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleAddStudent = async (e) => {
        e.preventDefault();
        const student = {
            Name: e.target.name.value,
            Email: e.target.email.value,
            DateOfBirth: e.target.dateOfBirth.value,
            EnrollmentDate: e.target.enrollmentDate.value,
            StudentCourses: []
        };

        try {
            await createStudent(student);
            fetchStudents();
        } catch (error) {
            console.error('Error adding student:', error.response ? error.response.data : error.message);
        }
    };

    const handleAddCourse = async (e) => {
        e.preventDefault();
        const course = {
            Name: e.target.name.value,
            Description: e.target.description.value,
            Credits: e.target.credits.value
        };

        try {
            await createCourse(course);
            fetchCourses();
        } catch (error) {
            console.error('Error adding course:', error.response ? error.response.data : error.message);
        }
    };

    const handleDeleteStudent = async (id) => {
        try {
            await deleteStudent(id);
            fetchStudents();
        } catch (error) {
            console.error('Error deleting student:', error.response ? error.response.data : error.message);
        }
    };

    const handleDeleteCourse = async (id) => {
        try {
            await deleteCourse(id);
            fetchCourses();
        } catch (error) {
            console.error('Error deleting course:', error.response ? error.response.data : error.message);
        }
    };

    const handleEditStudent = async (e) => {
        e.preventDefault();
        
        if (!editStudent || !editStudent.studentId) {
            console.error('StudentId is missing');
            return;
        }

        const updatedStudent = {
            studentId: editStudent.studentId,
            name: e.target.name.value,
            email: e.target.email.value,
            dateOfBirth: e.target.dateOfBirth.value,
            enrollmentDate: e.target.enrollmentDate.value,
            studentCourses: editStudent.studentCourses || []
        };

        try {
            await updateStudent(updatedStudent.studentId, updatedStudent);
            fetchStudents();
            setEditStudent(null);
        } catch (error) {
            console.error('Error updating student:', error.response ? error.response.data : error.message);
        }
    };
    
    const handleEditCourse = async (e) => {
        e.preventDefault();
        
        if (!editCourse || !editCourse.courseId) {
            console.error('CourseId is missing');
            return;
        }

        const updatedCourse = {
            CourseId: editCourse.courseId,
            Name: e.target.name.value,
            Description: e.target.description.value,
            Credits: e.target.credits.value
        };

        try {
            await updateCourse(updatedCourse.CourseId, updatedCourse);
            fetchCourses();
            setEditCourse(null);
        } catch (error) {
            console.error('Error updating course:', error.response ? error.response.data : error.message);
        }
    };

    const handleStudentDetails = (student) => {
        setSelectedStudent(student);
    };

    const handleCourseDetails = (course) => {
        setSelectedCourse(course);
    };

    const handleCloseStudentDetails = () => {
        setSelectedStudent(null);
    };

    const handleCloseCourseDetails = () => {
        setSelectedCourse(null);
    };

    return (
        <div className="container">
            <h2>Öğrenciler</h2>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>İsim</th>
                            <th>Email</th>
                            <th>Seçenekler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student.studentId}>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>
                                    <button onClick={() => handleStudentDetails(student)}>Details</button>
                                    <button onClick={() => setEditStudent(student)}>Edit</button>
                                    <button onClick={() => handleDeleteStudent(student.studentId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    
            {selectedStudent && (
                <StudentDetails student={selectedStudent} onClose={handleCloseStudentDetails} courses={courses} />
            )}
    
    {editStudent && (
    <Modal show={true} onHide={() => setEditStudent(null)}>
        <Modal.Header closeButton>
            <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={handleEditStudent} className="form-container">
                <label>
                    İsim:
                    <input type="text" name="name" defaultValue={editStudent.name} />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" defaultValue={editStudent.email} />
                </label>
                <label>
                    Doğum Tarihi:
                    <input type="date" name="dateOfBirth" defaultValue={editStudent.dateOfBirth ? editStudent.dateOfBirth.substring(0, 10) : ''} />
                </label>
                <label>
                    Kayıt Tarihi:
                    <input type="date" name="enrollmentDate" defaultValue={editStudent.enrollmentDate ? editStudent.enrollmentDate.substring(0, 10) : ''} />
                </label>
            </form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => setEditStudent(null)}>
                Cancel
            </Button>
            <Button variant="primary" onClick={handleEditStudent}>
                Update Student
            </Button>
        </Modal.Footer>
    </Modal>
)}
    
            <h2>Öğrenci Ekle</h2>
            <form onSubmit={handleAddStudent} className="form-container">
                <label>
                    İsim:
                    <input type="text" name="name" required />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" required />
                </label>
                <label>
                Doğum Tarihi:
                    <input type="date" name="dateOfBirth" required />
                </label>
                <label>
                Kayıt Tarihi:
                    <input type="date" name="enrollmentDate" required />
                </label>
                <button type="submit-sm">Add Student</button>
            </form>
    
            <h2>Dersler</h2>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>İsim</th>
                            <th>Açıklama</th>
                            <th>Kredi</th>
                            <th>Seçenekler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map(course => (
                            <tr key={course.courseId}>
                                <td>{course.name}</td>
                                <td>{course.description}</td>
                                <td>{course.credits}</td>
                                <td>
                                    <button onClick={() => handleCourseDetails(course)}>Details</button>
                                    <button onClick={() => setEditCourse(course)}>Edit</button>
                                    <button onClick={() => handleDeleteCourse(course.courseId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    
            {selectedCourse && (
                <CourseDetails course={selectedCourse} onClose={handleCloseCourseDetails} />
            )}
    
            {editCourse && (
                <div>
                    <h2>Ders Düzenle</h2>
                    <form onSubmit={handleEditCourse} className="form-container">
                        <label>
                            İsim:
                            <input type="text" name="name" defaultValue={editCourse.name} />
                        </label>
                        <label>
                            Açıklama:
                            <input type="text" name="description" defaultValue={editCourse.description} />
                        </label>
                        <label>
                            Kredi:
                            <input type="number" name="credits" defaultValue={editCourse.credits} />
                        </label>
                        <button type="submit">Update Course</button>
                    </form>
                </div>
            )}
    
            <h2>Ders Ekle</h2>
            <form onSubmit={handleAddCourse} className="form-container">
                <label>
                    İsim:
                    <input type="text" name="name" required />
                </label>
                <label>
                    Açıklama:
                    <input type="text" name="description" required />
                </label>
                <label>
                    Kredi:
                    <input type="number" name="credits" required />
                </label>
                <button type="submit">Add Course</button>
            </form>
        </div>
    );
};

export default Dashboard;