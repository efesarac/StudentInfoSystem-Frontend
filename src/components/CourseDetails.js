import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const CourseDetails = ({ course, onClose }) => {
    if (!course) return null;

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{course.Name} Detaylar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Açıklama:</strong> {course.description}</p>
                <p><strong>Kredi:</strong> {course.credits}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Kapat
                </Button>
            </Modal.Footer>
            </Modal>
    );
};

export default CourseDetails;