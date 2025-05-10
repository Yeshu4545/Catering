import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/cart/CartContext";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import AboutUs from "./components/About/About";
import WhyChooseUs from "./components/Why/Why";
import Menu from "./components/Menu/Menu";
import Testimonials from "./components/Testimonals/Testimonal"; 
import Gallery from "./components/Gallery/Gallery";
import FAQ from "./components/FAQs/faq";
import ContactUs from "./components/Contact/Contact";
import Footer from "./components/Footer/footer";
import Checkout from "./components/cart/Checkout"; 
import CartModal from "./components/cart/cartPage"; 
import OrderSuccess from "./components/OrderSucess/orderSucess"; 
import ProtectedCheckout from './components/cart/protectedCheckout'
import "./App.css";
import "./index.css";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <AboutUs />
                <Menu />
                <WhyChooseUs />
                <Testimonials />
                <Gallery />
                <FAQ />
                <ContactUs />
              </>
            }
          />

          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/why" element={<WhyChooseUs />} />
          <Route path="/contact" element={<ContactUs />} />

          <Route path="/cart" element={<CartModal />} />
          <Route
            path="/checkout"
            element={
              <ProtectedCheckout>
                <Checkout />
              </ProtectedCheckout>
            }
          />
          <Route path="/order-success" element={<OrderSuccess />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
};

export default App;
