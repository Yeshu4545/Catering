import React from "react";
import salad from "../../../assets/salad.gif"
import service from "../../../assets/service.gif"
import taste from "../../../assets/taste.gif"
import menu from "../../../assets/menu.gif"
import "./Why.css";

const features = [
  {
    title: "Authentic Taste",
    description: "Experience the rich and traditional flavors of South Indian cuisine, prepared with love and heritage.",
    image: taste,
  },
  {
    title: "Fresh Ingredients",
    description: "We use only the freshest locally sourced ingredients to maintain high quality and authenticity.",
    image: salad,
  },
  {
    title: "Premium Service",
    description: "Our professional chefs and staff ensure a seamless and delightful dining experience.",
    image: service,
  },
  {
    title: "Customizable Menu",
    description: "Tailor your menu to suit your taste and occasion, ensuring a personalized experience.",
    image: menu,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="why-choose-us">
      <h2>Why Choose Us?</h2>
      <div className="features">
        {features.map((feature, index) => (
          <div key={index} className="feature">
            <img src={feature.image} alt={feature.title} className="feature-icon" />
            <div className="feature-text">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
