import React from 'react';
import { Sparkles, Heart, Users, CheckCircle, Shield, TrendingUp, Headphones } from 'lucide-react';
import aboutimage from '../assets/aboutimage.png';
import bg from '../assets/bg.jpg';

const About = () => {
  const values = [
    { 
      icon: Sparkles, 
      title: "Creativity", 
      description: "Infusing unique designs and boundless imagination into every piece of resin art." 
    },
    { 
      icon: Heart, 
      title: "Quality", 
      description: "Using only premium, non-yellowing resin and pigments for lasting beauty and finish." 
    },
    { 
      icon: Users, 
      title: "Community", 
      description: "Fostering a space for craft lovers, collaborating with local artists, and supporting handmade." 
    },
  ];

  const stats = [
    { number: "2020", label: "Established" },
    { number: "1000+", label: "Happy Customers" },
    { number: "500+", label: "Unique Designs" },
    { number: "100%", label: "Handcrafted" },
  ];

  const whyChooseUs = [
    {
      icon: Shield,
      title: "Quality Assured",
      description: "We prioritize the quality of your products, adhering to the best industry standards."
    },
    {
      icon: TrendingUp,
      title: "Scalability",
      description: "Our craft solutions ensure smooth scaling to meet your growing demands."
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Our dedicated support team is available around the clock to assist you with any issues."
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Browse Our Collection",
      description: "Begin your journey by exploring our unique handcrafted resin pieces."
    },
    {
      number: "2",
      title: "Customization",
      description: "Work with our artisans to personalize your perfect piece."
    },
    {
      number: "3",
      title: "Order & Enjoy",
      description: "Place your order and we'll carefully craft and ship your masterpiece."
    },
    {
      number: "4",
      title: "Share Your Experience",
      description: "Join our community and share your unique piece with fellow craft lovers."
    },
  ];

  return (
    <div className="about-container">
      <style jsx="true">{`
        /* General Layout */
        .about-container {
          min-height: 100vh;
          background-color: #0a0a0f;
          color: white;
        }

        /* Hero Section */
        .hero-section {
          background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.62)),
                      url(${bg}) center/cover;
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 4rem 1.5rem;
        }
        .hero-title {
          font-size: 3rem;
          font-weight: 700;
          color: #bb6fedff;
          margin: 0;
        }

        /* Main Content */
        .main-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 1.5rem;
        }

        /* About Section with Badge */
        .about-section {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
          margin-bottom: 5rem;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          border-radius: 1rem;
          padding: 3rem;
          position: relative;
        }
        @media (min-width: 768px) {
          .about-section {
            grid-template-columns: 1.2fr 1fr;
          }
        }
        .about-badge {
          position: absolute;
          top: -15px;
          left: 2rem;
          background: linear-gradient(135deg, #C483F0 0%, #7e50aa 100%);
          color: white;
          padding: 0.5rem 1.5rem;
          border-radius: 2rem;
          font-size: 0.875rem;
          font-weight: 600;
        }
        .about-content h2 {
          font-size: 2rem;
          font-weight: 700;
          color: white;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }
        .about-content p {
          color: #b0b0b0;
          line-height: 1.8;
          margin-bottom: 1rem;
        }
        .about-image-wrapper {
          border-radius: 1rem;
          overflow: hidden;
          height: 350px;
        }
        .about-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Stats Section */
        .stats-section {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          margin-bottom: 5rem;
          padding: 3rem 0;
        }
        @media (min-width: 768px) {
          .stats-section {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        .stat-item {
          text-align: center;
        }
        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #C483F0 0%, #7e50aa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: block;
          margin-bottom: 0.5rem;
        }
        .stat-label {
          font-size: 0.875rem;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Why Choose Us Section */
        .why-section {
          margin-bottom: 5rem;
        }
        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .section-title {
          font-size: 2rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.5rem;
        }
        .section-subtitle {
          color: #9ca3af;
          font-size: 1rem;
        }
        .why-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        @media (min-width: 768px) {
          .why-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .why-card {
          background: #1a1a2e;
          border-radius: 1rem;
          padding: 2.5rem 2rem;
          text-align: center;
          border: 1px solid #2a2a3e;
          transition: all 0.3s ease;
        }
        .why-card:hover {
          transform: translateY(-5px);
          border-color: #C483F0;
          box-shadow: 0 10px 30px rgba(196, 131, 240, 0.2);
        }
        .why-icon-wrapper {
          width: 70px;
          height: 70px;
          margin: 0 auto 1.5rem;
          background: linear-gradient(135deg, rgba(196, 131, 240, 0.2) 0%, rgba(126, 80, 170, 0.2) 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .why-icon {
          width: 35px;
          height: 35px;
          color: #C483F0;
        }
        .why-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: white;
          margin-bottom: 0.75rem;
        }
        .why-description {
          color: #9ca3af;
          font-size: 0.9375rem;
          line-height: 1.6;
        }

        /* How It Works Section */
        .how-section {
          margin-bottom: 5rem;
        }
        .how-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }
        @media (min-width: 768px) {
          .how-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        .how-image-wrapper {
          border-radius: 1rem;
          overflow: hidden;
          height: 500px;
        }
        .how-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .steps-container {
          padding: 2rem 0;
        }
        .steps-header {
          font-size: 0.875rem;
          color: #C483F0;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 1rem;
        }
        .steps-title {
          font-size: 2rem;
          font-weight: 700;
          color: white;
          margin-bottom: 1rem;
        }
        .steps-subtitle {
          color: #9ca3af;
          margin-bottom: 2rem;
        }
        .step-item {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        .step-number {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #C483F0 0%, #7e50aa 100%);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          font-weight: 700;
          flex-shrink: 0;
        }
        .step-content h4 {
          font-size: 1.125rem;
          font-weight: 600;
          color: white;
          margin-bottom: 0.5rem;
        }
        .step-content p {
          color: #9ca3af;
          font-size: 0.9375rem;
          line-height: 1.6;
        }
        .cta-button {
          background: linear-gradient(135deg, #C483F0 0%, #7e50aa 100%);
          color: white;
          padding: 0.875rem 2rem;
          border-radius: 0.5rem;
          border: none;
          font-weight: 600;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.3s ease;
          display: inline-block;
          margin-top: 1rem;
        }
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(196, 131, 240, 0.4);
        }

        /* Light Mode Support */
        [data-theme="light"] .about-container {
          background-color: #E6E6FA;
        }
        [data-theme="light"] .hero-section {
      
                      url(${bg}) center/cover;    //about us background
        }
        [data-theme="light"] .about-section {
          background: white;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        [data-theme="light"] .about-content h2,
        [data-theme="light"] .section-title,
        [data-theme="light"] .why-title,
        [data-theme="light"] .steps-title,
        [data-theme="light"] .step-content h4 {
          color: #4B0082;
        }
        [data-theme="light"] .about-content p,
        [data-theme="light"] .section-subtitle,
        [data-theme="light"] .why-description,
        [data-theme="light"] .steps-subtitle,
        [data-theme="light"] .step-content p {
          color: #6b7280;
        }
        [data-theme="light"] .why-card {
          background: white;
          border-color: #E6E6FA;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        [data-theme="light"] .stat-label {
          color: #6b7280;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2rem;
          }
          .section-title {
            font-size: 1.75rem;
          }
          .about-section {
            padding: 2rem;
          }
        }
      `}</style>

      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">About Us</h1>
      </div>

      <div className="main-content">
        {/* About Section */}
        <div className="about-section">
          <div className="about-badge">10+ Years Experience</div>
          <div className="about-content">
            <h2>Crafting Joy, One Pour at a Time</h2>
            <p>
              Shreem Crafts started in a small home studio in 2020 by a single artisan with a deep love 
              for the translucent beauty of epoxy resin. Our passion for creating unique, handcrafted pieces 
              has grown into a mission to bring functional art into every home.
            </p>
            <p>
              Every piece—from coasters to jewelry—is individually poured, pigmented, and polished to perfection. 
              We believe handmade goods possess a soul that mass-produced items simply cannot match.
            </p>
          </div>
          <div className="about-image-wrapper">
            <img 
              src={aboutimage} 
              alt="Shreem Crafts artisan at work" 
              className="about-image"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800";
              }}
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className="why-section">
          <div className="section-header">
            <h2 className="section-title">Why Choose Us</h2>
            <p className="section-subtitle">Discover what makes Shreem Crafts unique</p>
          </div>
          <div className="why-grid">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="why-card">
                <div className="why-icon-wrapper">
                  <item.icon className="why-icon" />
                </div>
                <h3 className="why-title">{item.title}</h3>
                <p className="why-description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="how-section">
          <div className="how-grid">
            <div className="how-image-wrapper">
              <img 
                src={aboutimage} 
                alt="How it works" 
                className="how-image"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800";
                }}
              />
            </div>
            <div className="steps-container">
              <div className="steps-header">How It Works</div>
              <h2 className="steps-title">Use only with 4 easy steps</h2>
              <p className="steps-subtitle">Discover the effortless way to own your masterpiece</p>
              
              {steps.map((step, index) => (
                <div key={index} className="step-item">
                  <div className="step-number">{step.number}</div>
                  <div className="step-content">
                    <h4>{step.title}</h4>
                    <p>{step.description}</p>
                  </div>
                </div>
              ))}
              
              {/* <button className="cta-button">Get Started</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;