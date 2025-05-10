import React from 'react';
import './Contact.css';

const ContactUs = () => {
    return (
        <section className="contact-section">
            <h2> <span>Contact</span> Us</h2>
            <div className="contact-container">
                <div className="contact-info">
                    <p><strong>Address:</strong> 123 South Indian Street, Hyderabad, India</p>
                    <p><strong>Phone:</strong> +91 98765 43210</p>
                    <p><strong>Email:</strong> contact@sattvacatering.com</p>
                </div>
                <div className="map-container">
                    <iframe
                        title="Google Map Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.453184842707!2d79.57905247506286!3d17.9784064832964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a33452e28dc0edb%3A0x3f4e3b3e3b8a5a5e!2sWarangal%2C%20Telangana%2C%20India!5e0!3m2!1sen!2sin!4v1711198742935!5m2!1sen!2sin"
                        width="100%"
                        height="300"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
