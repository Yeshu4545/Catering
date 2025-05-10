import React, { useState } from 'react';
import './faq.css';

const faqs = [
    {
        question: "What catering services do you offer?",
        answer: "We offer catering for weddings, corporate events, parties, and more with customizable menus. "
    },
    {
        question: "Do you offer vegetarian options?",
        answer: "Yes! We have a variety of delicious vegetarian and vegan options available."
    },
    {
        question: "How can I place an order?",
        answer: "You can contact us through our website, phone, or email to discuss your catering needs."
    },
    {
        question: "Do you provide delivery services?",
        answer: "Yes, we offer on-time delivery and full-service catering for all types of events."
    }
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="faq-section">
            <h2> <span>Frequently </span>Asked Questions  </h2>
            <div className="faq-container">
                {faqs.map((faq, index) => (
                    <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`} onClick={() => toggleFAQ(index)}>
                        <div className="faq-question">
                            {faq.question}
                            <span className={`arrow ${activeIndex === index ? 'rotate' : ''}`}>&#9660;</span>
                        </div>
                        <div className="faq-answer" style={{ maxHeight: activeIndex === index ? '200px' : '0px', opacity: activeIndex === index ? 1 : 0 }}>{faq.answer}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQ;
