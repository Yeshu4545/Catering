import React from 'react';
import arun from "../../../assets/IMG_7022.png"
import uday from "../../../assets/meal.jpg"
import vasu from "../../../assets/0987.jpg"
import img1 from "../../../assets/IMG_7025.png"
import img2 from "../../../assets/IMG_7024.png"
import img3 from "../../../assets/IMG_7021.png"
import './Gallery.css';

const images = [
    arun,
    uday,
    vasu,
    img1,
    img2,
    img3
    
];

const Gallery = () => {
    return (
        <section className="gallery-section">
            <h2> Our <span>Gallery</span> </h2>
            <div className="gallery-container">
                {images.map((src, index) => (
                    <div key={index} className="gallery-item">
                        <img src={src} alt={`Gallery Image ${index + 1}`} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Gallery;
