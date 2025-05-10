import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import arun from "../../../assets/arun.jpg";
import uday from "../../../assets/about.jpg";
import vasu from "../../../assets/vasudev.jpg";
import './Testimonals.css';

const testimonials = [
    {
        name: "Arun Kumar",
        review: "Absolutely delicious food! The flavors were authentic, and the service was top-notch.",
        image: arun,
        rating: 5
    },
    {
        name: "Uday Goud",
        review: "The best catering service I've ever experienced. Perfect for any occasion!",
        image: uday,
        rating: 5
    },
    {
        name: "Vasudev",
        review: "Loved the variety and taste. Highly recommended for authentic South Indian cuisine!",
        image: vasu,
        rating: 4
    }
];

const Testimonials = () => {
    return (
        <section className="testimonials-section">
            <div className="container">
                <motion.h2 
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    What Our Customers Say
                </motion.h2>
                <p className="section-subtitle">Hear from people who've experienced our authentic flavors</p>
                
                <div className="testimonials-grid">
                    {testimonials.map((testimonial, index) => (
                        <motion.div 
                            key={index}
                            className="testimonial-card"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                        >
                            <FaQuoteLeft className="quote-icon" />
                            <div className="testimonial-content">
                                <p className="review-text">"{testimonial.review}"</p>
                                <div className="rating">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar 
                                            key={i}
                                            className={i < testimonial.rating ? "star-filled" : "star-empty"}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="customer-info">
                                <div className="avatar-container">
                                    <img 
                                        src={testimonial.image} 
                                        alt={testimonial.name} 
                                        className="customer-avatar"
                                    />
                                </div>
                                <h4 className="customer-name">{testimonial.name}</h4>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;