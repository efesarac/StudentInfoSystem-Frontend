import React, { useEffect, useState } from "react";
import { getCourses, deleteCourse, updateCourse } from '../services/courseService';
import CourseDetails from './CourseDetails';
import { toast } from "react-toastify";
import { Modal,Button } from "react-bootstrap";

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [editCourse, setEditCourse] = useState(null);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        const data = await getCourses();
        setCourses(data);
};
  
    const handleDeleteCourse = async (id) => {
            await deleteCourse(id);
            fetchCourses();
            toast.success('Ders başarıyla silindi!', {
                position: "top-center"
            });
    };

    const handleEditCourse = async (e) => {
        e.preventDefault();

        const updatedCourse = {
            CourseId: editCourse.courseId,
            Name: e.target.name.value,
            Description: e.target.description.value,
            Credits: e.target.credits.value
        };
            await updateCourse(updatedCourse.CourseId, updatedCourse);
            fetchCourses();
            setEditCourse(null);
            toast.success('Ders başarıyla güncellendi!', {
                position: "top-center"
            });

    };

    const handleCourseDetails = (course) => {
        setSelectedCourse(course);
    };

    const handleCloseCourseDetails = () => {
        setSelectedCourse(null);
    };


    return (
        <div>
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
                <Modal show={true} onHide={() => setEditCourse(null)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Course</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleEditCourse} className="form-container">
                            <label>
                                İsim:
                                <input type="text" name="name" defaultValue={editCourse.name} />
                            </label>
                            <label>
                                Açıklama:
                                <textarea name="description" defaultValue={editCourse.description}></textarea>
                            </label>
                            <label>
                                Kredi:
                                <input type="number" name="credits" defaultValue={editCourse.credits} />
                            </label>
                            <Button variant="secondary" onClick={() => setEditCourse(null)}>
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit">
                                Update Course
                            </Button>
                        </form>
                    </Modal.Body>
                </Modal>
            )}
    
        </div>
    );
};

export default CourseList;