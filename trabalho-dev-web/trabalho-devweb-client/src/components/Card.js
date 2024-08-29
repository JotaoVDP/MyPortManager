import React from 'react';
import './componentStyles/card.css'; // Make sure to create a CSS file for styling

export default function Card({ title, description, imageSrc }) {
    const caminho = imageSrc;
    return (
        <div className="card">
            <img src={require(caminho).default} alt={title} />
            <div className="card-content">
                <h3 className="card-title">{title}</h3>
                <p className="card-description">{description}</p>
            </div>
        </div>
    );
}