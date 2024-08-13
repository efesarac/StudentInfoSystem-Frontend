import React, { useEffect, useState } from "react";
import { getStudents, deleteStudent, updateStudent } from "../services/studentService";
import StudentDetails from "./StudentDetails";
import { toast } from "react-toastify";
import { Modal,Button } from "react-bootstrap";
import { getCourses} from "../services/courseService";

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [editStudent, setEditStudent] = useState(null);

    useEffect(() => {
        fetchStudents();
        fetchCourses();
    },[])

    const fetchStudents = async () => {
        const data = await getStudents();
        setStudents(data);
    }
    const fetchCourses = async () => {
        const data = await getCourses();
        setCourses(data);
    }
    const handleDeleteStudent = async (id) => {
        await deleteStudent(id);
        fetchStudents();
        toast.success('Öğrenci Başarıyla Silindi!', {
            position: "top-center"
        });
    }
    const handleEditStudent = async (e) => {
        e.preventDefault();

        const updatedStudent = {
            studentId: editStudent.studentId,
            name: e.target.name.value,
            email: e.target.email.value,
            dateOfBirth: e.target.dateOfBirth.value,
            enrollmentDate: e.target.enrollmentDate.value,
            studentCourses: editStudent.studentCourses || []
        };
            await updateStudent(updatedStudent.studentId, updatedStudent);
            fetchStudents();
            setEditStudent(null);
            toast.success('Öğrenci başarıyla güncellendi', {
                position: "top-center"
            });
    };
    
    const handleStudentDetails = (student) => {
        setSelectedStudent(student);
    };
    const handleCloseStudentDetails = () => {
        setSelectedStudent(null);
    };

    return (
        <div>
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
                            <Button variant="secondary" onClick={() => setEditStudent(null)}>
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit">
                                Update Student
                            </Button>
                        </form>
                    </Modal.Body>
                </Modal>
            )}
    
        </div>
    );
};

export default StudentList;