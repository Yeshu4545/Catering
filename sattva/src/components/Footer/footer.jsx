import React from 'react';
import './footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-column">
                    <h3>Sattva Catering</h3>
                    <p>Bringing you the best South Indian flavors with authentic taste and tradition.</p>
                    <p><strong>Address:</strong> 123 South Indian Street, Warangal, India</p>
                    <p><strong>Phone:</strong> +91 98765 43210</p>
                    <p><strong>Email:</strong> contact@yourcatering.com</p>
                </div>
                <div className="footer-column">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Our Menu</a></li>
                        <li><a href="#">Catering Services</a></li>
                        <li><a href="#">Contact Us</a></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h4>Policies</h4>
                    <ul>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms & Conditions</a></li>
                        <li><a href="#">Refund Policy</a></li>
                    </ul>
                </div>
                <div className="footer-column social-icons">
                    <h4>Follow Us</h4>
                    <a href="#" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
                    <a href="#" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                    <a href="#" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                    <a href="#" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
                </div>
            </div>
            <p className="footer-bottom">&copy; 2025 Your Catering. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
