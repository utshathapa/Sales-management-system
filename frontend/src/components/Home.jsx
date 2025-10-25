import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "../css/Home.css"; 
import { useCart } from "../components/Cartcomponent"; 

export default function Home() {
  const [user, setUser] = useState({ name: "" });
  const { addToCart } = useCart(); 
  
  // Initialize the useNavigate hook
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.name) {
      setUser(storedUser);
    } else {
      setUser({ name: "Guest" });
    }
  }, []);

  // Navigation function: Sends the user to the /products path
  const handleExploreClick = () => {
    navigate("/products"); 
  };

  // ✨ NEW: Navigation function for the contact page button
  const handleContactClick = () => {
    // Navigates to the route defined for your Contact component
    navigate("/contact"); 
  };


  // Dummy product data for Popular Products section
  const products = [
    { id: 1, name: "Resin Dish #1", price: 1200, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Resin Dish #2", price: 1200, image: "https://via.placeholder.com/150" },
    { id: 3, name: "Resin Dish #3", price: 1200, image: "https://via.placeholder.com/150" },
    { id: 4, name: "Resin Dish #4", price: 1200, image: "https://via.placeholder.com/150" },
  ];

  return (
    <div className="shreemcraft-container">
      {/* HERO SECTION */}
      <section className="hero-section hero-bg-shreemcraft">
        <div className="hero-text-container">
          <h2 className="hero-subtitle">Curated Handmade Goods</h2>
          <h1 className="hero-title">Elegance in Craft</h1>
          <p className="hero-description">Find unique crafts that transform your space.</p>
          
          {/* The button with the navigation handler */}
          <button 
            className="explore-button"
            onClick={handleExploreClick} 
          >
            EXPLORE COLLECTIONS
          </button>

          {/* DYNAMIC USER NAME */}
          <div className="welcome-message-wrapper">
            <span className="welcome-message">Welcome back, {user.name} 👋</span>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="section services-section">
        <h3 className="section-subtitle">WHAT WE OFFER</h3>
        <h2 className="section-title">Designed with Passion, Crafted with Care</h2>

        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">🚚</div>
            <h4 className="service-title">Fast Global Shipping</h4>
            <p className="service-description">
              Get your handmade goods delivered quickly and reliably to any location worldwide.
            </p>
            <button className="service-button">DISCOVER</button>
          </div>

          <div className="service-card">
            <div className="service-icon">🎁</div>
            <h4 className="service-title">Customized Gifting</h4>
            <p className="service-description">
              Personalize your products with custom engravings and luxurious gift wrapping options.
            </p>
            <button className="service-button">DISCOVER</button>
          </div>

          <div className="service-card">
            <div className="service-icon">🛍️</div>
            <h4 className="service-title">Local Pick-up Available</h4>
            <p className="service-description">
              If you are near our main studio, you can arrange a complimentary local pick-up to save on shipping.
            </p>
            <button className="service-button">DISCOVER</button>
          </div>
        </div>
      </section>

      {/* GIFT BANNER */}
      <section className="gift-banner-wrapper">
        <div className="gift-banner-container">
          <div className="gift-text-content">
            <h3 className="gift-subtitle">SPECIAL EDITION</h3>
            <h2 className="gift-title">Gift Ideas That Last Longer</h2>
            <p className="gift-description">
              Little reminders make someone's day brighter. Our curated craft collection makes perfect gifts that bring joy long after traditional store-bought items would fade.
            </p>
            <button className="gift-button" onClick={() => navigate("/products")}>SHOP GIFTS →</button>
          </div>
          <div className="gift-icon-container">
            <div className="gift-icon">🏺</div>
          </div>
        </div>
      </section>

      {/* POPULAR PRODUCTS */}
      <section className="section products-section">
        <h2 className="section-title product-section-title">See What's Popular</h2>

        <div className="products-grid">
          {products.map((item) => (
            <div key={item.id} className="product-card">
              <img src={item.image} alt={item.name} className="product-image" />
              <div className="product-details">
                <h4 className="product-name">{item.name}</h4>
                <p className="product-price">Rs. {item.price}</p>
                <button
                  className="add-to-cart-button"
                  onClick={() => {
                    addToCart(item); // Add item to cart
                    
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="section contact-section-wrapper">
        <div className="contact-circle">
          <h3 className="contact-title">Talk To Our Staff</h3>
          <p className="contact-description">
            Trouble choosing your product? We are happy to provide expert advice and customized options.
          </p>
          <button 
            className="contact-button"
            onClick={handleContactClick} // <-- This is the new change
          >
            LET'S TALK
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content-wrapper">
          <div className="footer-grid">
            <div className="footer-col footer-col-logo">
              <h4 className="footer-logo">Shreemcraft</h4>
              <p className="footer-tagline">Custom handmade goods that inspire.</p>
              <input type="email" placeholder="Email Address" className="newsletter-input" />
              <button className="newsletter-button">SUBSCRIBE</button>
            </div>

            <div className="footer-links-grid">
              <div className="footer-col">
                <p className="footer-heading">CONTACT</p>
                <span className="footer-link-item">+(123) 456-7890</span>
                <span className="footer-link-item">hello@shreemcraft.com</span>
                <span className="footer-link-item">123 Artisan Alley</span>
              </div>

              <div className="footer-col">
                <p className="footer-heading">HELP</p>
                <span className="footer-link-item">SHIPPING & RETURNS</span>
                <span className="footer-link-item">STORE POLICY</span>
                <span className="footer-link-item">FAQ</span>
              </div>

              <div className="footer-col">
                <p className="footer-heading">COMPANY</p>
                <span className="footer-link-item">ABOUT US</span>
                <span className="footer-link-item">WORK WITH US</span>
                <span className="footer-link-item">PRIVACY POLICY</span>
                <span className="footer-link-item">TERMS & CONDITIONS</span>
              </div>
            </div>
          </div>

          
         
        </div>
      </footer>
    </div>
  );
}