import React from "react";
import Dashboard from './components/Dashboard';
import StudentList from  './components/StudentList';
import CourseList from  './components/CourseList';
import Bar from "./shared/Bar";
import './index.css'
import './App.css'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";


const App = () => {
    return (    
        <Router>
        <div>
        <ToastContainer />
            <Bar /> 
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/students" element={<StudentList />} />
                <Route path="/courses" element={<CourseList />} />
            </Routes>
        </div>
        </Router>
    );
};

export default App;