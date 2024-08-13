import { createStudent} from '../services/studentService';
import { createCourse } from '../services/courseService';
import './Dashboard.css';
import { toast } from 'react-toastify';

const Dashboard = () => {

    const handleAddStudent = async (e) => {
        e.preventDefault();
        const student = {
            Name: e.target.name.value,
            Email: e.target.email.value,
            DateOfBirth: e.target.dateOfBirth.value,
            EnrollmentDate: e.target.enrollmentDate.value,
            StudentCourses: []
        };
            await createStudent(student);

            toast.success("Öğrenci başarıyla eklendi!!!", {
                position: "top-center"
            });
        };
    

    const handleAddCourse = async (e) => {
        e.preventDefault();
        const course = {
            Name: e.target.name.value,
            Description: e.target.description.value,
            Credits: e.target.credits.value
        };
            await createCourse(course);

            toast.success('Ders başarıyla eklendi!!!', {
                position: "top-center"
            });
    };


    return (
        <div className="container">
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
                <button type="submit">Add Student</button>
            </form>
    
           
            <h2>Ders Ekle</h2>
            <form onSubmit={handleAddCourse} className="form-container">
                <label>
                    İsim:
                    <input type="text" name="name" required />
                </label>
                <label>
                    Açıklama:
                    <textarea name="description" required></textarea>
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