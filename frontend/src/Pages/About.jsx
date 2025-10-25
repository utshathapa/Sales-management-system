import React from 'react';
import { Sparkles, Heart, Users, CheckCircle } from 'lucide-react';
import aboutimage from '../assets/aboutimage.png';

// Define the component using the project's aesthetic: 
// Background: #E6E6FA (Light Lavender)
// Text/Main: #4B0082 (Dark Purple/Indigo)
// Accent/Button: #C71585 (Deep Magenta)

const About = () => {

  const values = [
    { icon: Sparkles, title: "Creativity", description: "Infusing unique designs and boundless imagination into every piece of resin art." },
    { icon: Heart, title: "Quality", description: "Using only premium, non-yellowing resin and pigments for lasting beauty and finish." },
    { icon: Users, title: "Community", description: "Fostering a space for craft lovers, collaborating with local artists, and supporting handmade." },
    { icon: CheckCircle, title: "Sustainability", description: "Minimizing waste and ethically sourcing materials where possible to protect our planet." },
  ];

  return (
    <div className="about-container">
      <style jsx="true">{`
        /* General Layout & Background */
        .about-container {
          min-height: 100vh;
          background-color: #E6E6FA; /* Light Lavender */
          padding: 1.5rem; /* p-6 */
          display: flex;
          align-items: flex-start; /* Align to top */
          justify-content: center;
        }
        @media (min-width: 640px) {
          .about-container {
            padding: 2.5rem; /* sm:p-10 */
          }
        }
        
        /* Main Content Card */
        .main-card {
          background-color: white;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); /* shadow-2xl */
          border-radius: 1.5rem; /* rounded-3xl */
          width: 100%;
          max-width: 80rem; /* max-w-6xl */
          overflow: hidden;
          margin-top: 2rem;
          margin-bottom: 2rem;
        }

        /* Section Padding */
        .content-padding {
          padding: 2.5rem; /* p-10 */
        }
        @media (min-width: 768px) {
          .content-padding {
            padding: 4rem; /* md:p-16 */
          }
        }

        /* Typography and Colors */
        .main-heading {
          font-size: 3rem; /* text-5xl */
          font-weight: 800; /* font-extrabold */
          margin-bottom: 1rem; /* mb-4 */
          color: #4B0082; /* Dark Purple/Indigo */
          letter-spacing: -0.05em; /* tracking-tight */
          line-height: 1;
        }
        .sub-heading {
          font-size: 2.25rem; /* text-4xl */
          font-weight: 700; /* font-bold */
          margin-bottom: 1.5rem; /* mb-6 */
          color: #C71585; /* Deep Magenta */
        }
        .text-main {
            color: #4B0082;
            line-height: 1.75;
        }
        .text-accent {
            color: #C71585;
            font-weight: 600;
        }

        /* Grid Layout for Values */
        .values-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 2rem; /* gap-8 */
          margin-top: 2.5rem; /* mt-10 */
        }
        @media (min-width: 640px) {
          .values-grid {
            grid-template-columns: repeat(2, 1fr); /* sm:grid-cols-2 */
          }
        }
        @media (min-width: 1024px) {
          .values-grid {
            grid-template-columns: repeat(4, 1fr); /* lg:grid-cols-4 */
          }
        }

        /* Value Card */
        .value-card {
            background-color: #F8F7FF; /* bg-indigo-50/50 */
            border-radius: 0.75rem; /* rounded-xl */
            padding: 1.5rem; /* p-6 */
            text-align: center;
            border: 1px solid #E0E7FF;
        }
        .value-icon {
            width: 3rem; /* w-12 */
            height: 3rem; /* h-12 */
            margin: 0 auto 1rem;
            color: #C71585; /* Deep Magenta */
        }
        .value-title {
            font-size: 1.25rem; /* text-xl */
            font-weight: 700;
            color: #4B0082;
            margin-bottom: 0.5rem;
        }
        .value-description {
            font-size: 0.875rem; /* text-sm */
            color: #4B0082;
        }
        
        /* Image Placeholder */
        .image-placeholder {
            min-height: 20rem; /* min-h-80 */
            background-color: #C7BFFB; /* bg-indigo-300 */
            border-radius: 1rem; /* rounded-xl */
            display: flex;
            align-items: center;
            justify-content: center;
            color: #4B0082;
            font-weight: 600;
            text-transform: uppercase;
            font-size: 1.5rem;
            opacity: 0.8;
            margin-bottom: 3rem;
            overflow: hidden;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        /* History Section Layout */
        .history-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem; /* gap-16 */
        }
        @media (min-width: 768px) {
          .history-grid {
            grid-template-columns: 2fr 1fr; /* md:grid-cols-[2fr,1fr] */
            align-items: center;
          }
        }
        .history-image {
    /* ... existing rules ... */
    width: 100%;
    height: 100%;
    object-fit: cover; /* Ensures the image covers the container without stretching */
}
      `}</style>

      <div className="main-card">
        
        {/* Header Section */}
        <header className="content-padding text-center">
          <h1 className="main-heading">Crafting Joy, One Pour at a Time</h1>
          <p className="text-xl text-main max-w-4xl mx-auto mt-4">
            Welcome to Shreem Crafts, where art meets passion. We specialize in bespoke, handcrafted resin pieces that bring color and unique design into your everyday life.
          </p>
        </header>

        {/* Vision & History Section */}
        <section className="content-padding pt-0">
            <div className="history-grid">
                
                {/* Text Content */}
                <div>
                    <h2 className="sub-heading">Our Story and Mission</h2>
                    <p className="text-main mb-6">
                        Shreem Crafts started in a small home studio in 2020 by a single artisan with a deep love for the translucent beauty of epoxy resin. It quickly grew into a mission: to create functional art that is as meaningful as it is beautiful. Every piece—from coasters to jewelry—is individually poured, pigmented, and polished to perfection.
                    </p>
                    <p className="text-main">
                        Our mission is simple: To inspire creativity and bring personalized artistry into the hands of our customers, ensuring high-quality, long-lasting products that you can cherish for years. We believe <span className="text-accent">handmade goods possess a soul</span> that mass-produced items simply cannot match.
                    </p>
                </div>

                {/* Image Placeholder */}
                <div className="image-placeholder history-image">
                    <img 
                        src={aboutimage} 
                        alt="Shreem Crafts Studio or Artisan at Work" 
                        className="history-image" 
                        // Optional: Add onerror to handle broken links gracefully
                        onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src="https://placehold.co/600x400/C7BFFB/4B0082?text=IMAGE+MISSING";
                        }}
                    />
                    
                </div>
            </div>
        </section>

        {/* Values Section */}
        <section className="content-padding bg-indigo-50/50">
          <h2 className="sub-heading text-center">The Values That Guide Us</h2>
          
          <div className="values-grid">
            {values.map((item, index) => (
              <div key={index} className="value-card">
                <item.icon className="value-icon" />
                <h3 className="value-title">{item.title}</h3>
                <p className="value-description">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Closing Call to Action */}
        <section className="content-padding text-center">
          <h2 className="sub-heading text-[#4B0082]">Join Our Journey</h2>
          <p className="text-main max-w-3xl mx-auto mb-8">
            Thank you for supporting small, independent creators. We invite you to explore our products, learn more about the art of resin, and become a part of the Shreem Crafts family.
          </p>
        </section>

      </div>
    </div>
  );
};

export default About;
