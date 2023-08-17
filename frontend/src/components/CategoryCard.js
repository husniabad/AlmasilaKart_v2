// CategoryIconCard.js
import React from 'react';
import { Card } from 'react-bootstrap';

function CategoryCard({ iconSrc, title }) {
    return (
        <Card className="mb-5 text-center border-0">
            <div className="rounded-circle bg-light p-4 mx-auto mt-3">
                <Card.Img src={iconSrc} alt="Icon" 
                style={{ width: '50px', height: '50px', transition: 'transform 0.2s, opacity 0.2s' }}
                className="zoom-out-image"
                />
            </div>
            <Card.Body className="p-0 mt-4">
                <Card.Title tag="h6" className="mb-0 font-weight-normal">{title}</Card.Title>
            </Card.Body>
        </Card>
    );
}

export default CategoryCard;
