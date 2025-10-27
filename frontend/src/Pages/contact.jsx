import React, { useState } from 'react';
import { Mail, Phone, MapPin, Twitter, Facebook, Instagram, Send } from 'lucide-react';

const Contact = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setMessage('Sending message...');

    const apiUrl = 'http://localhost:8080/api/contact';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Message sent successfully! Your message has been saved in the database.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        const errorData = await response.json();
        setStatus('error');
        setMessage(`Failed to send message: ${errorData.message || 'Server returned an error.'}`);
      }
    } catch (error) {
      setStatus('error');
      setMessage('A network error occurred. Please ensure your Laravel server is running and CORS is configured.');
      console.error('Submission Error:', error);
    }

    setTimeout(() => {
      setMessage('');
      setStatus('idle');
    }, 5000);
  };

  const buttonDisabled = status === 'sending';
  const isSuccess = status === 'success';
  const isError = status === 'error';

  return (
    <div className={darkMode ? 'contact-container dark' : 'contact-container'}>
      <style jsx="true">{`
        .contact-container {
          min-height: 100vh;
          background-color: #E6E6FA;
          padding: 1.5rem; 
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', sans-serif;
          color: #4B0082;
        }
        @media (min-width: 640px) {
          .contact-container {
            padding: 2.5rem;
          }
        }
        .main-card {
          background-color: white;
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
          border-radius: 1rem;
          width: 100%;
          max-width: 80rem;
          overflow: hidden;
        }
        .grid-layout {
          display: grid;
          grid-template-columns: 1fr;
        }
        @media (min-width: 1024px) {
          .grid-layout {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .form-section { padding: 3rem; }
        .form-heading { font-size: 2.25rem; font-weight: 800; margin-bottom: 1rem; letter-spacing: -0.025em; }
        .form-paragraph { margin-bottom: 2rem; }
        .form-label { display:block; font-size:0.875rem; font-weight:500; margin-bottom:0.25rem; }
        .form-input, .form-textarea {
          width:100%; padding:0.75rem; margin-bottom:1rem;
          border:1px solid #C7BFFB; border-radius:0.5rem;
          transition:border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          box-sizing:border-box;
        }
        .form-input::placeholder, .form-textarea::placeholder { color:#9C95D4; }
        .form-input:focus, .form-textarea:focus { border-color:#C71585; box-shadow:0 0 0 4px rgba(199,21,133,0.2); outline:none; }

        .status-message {
          padding:0.75rem; margin-bottom:1rem; border-radius:0.5rem;
          font-size:0.95rem; font-weight:600; text-align:center;
          opacity: ${message ? 1 : 0}; transition:opacity 0.3s ease-in-out;
        }
        .status-message.success { background-color:#E9FCEF; color:#1E8449; border:1px solid #A9DFBF; }
        .status-message.error { background-color:#FAEAEA; color:#943126; border:1px solid #F0A0A0; }
        .status-message.sending { background-color:#FEF9E7; color:#D68910; border:1px solid #F7DC6F; }

        .submit-button {
          width:100%; padding:0.75rem; margin-top:0.5rem;
          font-size:1.125rem; font-weight:600; color:white; background-color:#C71585;
          border-radius:0.5rem; display:flex; align-items:center; justify-content:center;
          transition: background-color 0.2s ease-in-out; cursor:pointer;
        }
        .submit-button:hover:not(:disabled) { background-color:#B80F74; }
        .submit-button:disabled { opacity:0.7; background-color:#D36C9C; cursor:not-allowed; }

        .info-section { padding:3rem; background-color:#F8F7FF; display:flex; flex-direction:column; justify-content:center; }
        .info-heading { font-size:1.875rem; font-weight:700; margin-bottom:1.5rem; }
        .info-detail { display:flex; align-items:flex-start; margin-bottom:1.5rem; }
        .info-detail p { margin-top:0.25rem; }
        .info-icon { width:1.5rem; height:1.5rem; margin-right:0.75rem; color:#C71585; flex-shrink:0; margin-top:0.25rem; }
        .info-detail h3 { font-weight:600; }
        .social-links { margin-top:2.5rem; padding-top:1.5rem; border-top:1px solid #E0E7FF; }
        .social-icon { transition: color 0.15s; }
        .social-icon:hover { color:#C71585; }

        /* Dark Mode */
        .dark { background-color:#121212; color:#f0f0f0; }
        .dark .main-card { background-color:#1e1e1e; }
        .dark .form-input, .dark .form-textarea { background-color:#2a2a2a; color:#f0f0f0; border:1px solid #555; }
        .dark .info-section { background-color:#2a2a2a; }
        .dark .social-icon { color:#f0f0f0; }
      `}</style>

      <div className="main-card">
        <div className="grid-layout">
          {/* Form Section */}
          <div className="form-section">
            <h1 className="form-heading">Get in Touch</h1>
            <p className="form-paragraph">
              We'd love to hear from you! Questions or support, our team is here to help.
            </p>

            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="form-label">Your Name</label>
                <input
                  type="text" id="name" name="name"
                  value={formData.name} onChange={handleChange}
                  placeholder="Enter your name" required
                  className="form-input"
                />
              </div>
              <div>
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email" id="email" name="email"
                  value={formData.email} onChange={handleChange}
                  placeholder="name@example.com" required
                  className="form-input"
                />
              </div>
              <div>
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message" name="message" rows="4"
                  value={formData.message} onChange={handleChange}
                  placeholder="Your message here..." required
                  className="form-textarea"
                ></textarea>
              </div>

              {message && (
                <div className={`status-message ${status}`}>
                  {isSuccess && <span>&#10003; </span>}
                  {isError && <span>&#10007; </span>}
                  {message}
                </div>
              )}

              <button type="submit" className="submit-button" disabled={buttonDisabled}>
                {status === 'sending' ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg> Sending...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send className="w-5 h-5 mr-2" /> Send Message
                  </span>
                )}
              </button>
            </form>
          </div>

          {/* Info Section */}
          <div className="info-section">
            <h2 className="info-heading">Our Details</h2>
            <div>
              <div className="info-detail">
                <Mail className="info-icon" />
                <div>
                  <h3>Email Support</h3>
                  <p>shreemcrafts.support@example.com</p>
                </div>
              </div>
              <div className="info-detail">
                <Phone className="info-icon" />
                <div>
                  <h3>Phone</h3>
                  <p>+9765975446 (Mon - Fri, 10am - 6pm IST)</p>
                </div>
              </div>
              <div className="info-detail">
                <MapPin className="info-icon" />
                <div>
                  <h3>Studio Location</h3>
                  <p>Kathmandu, Nepal</p>
                </div>
              </div>
            </div>

            <div className="social-links">
              <h3 className="mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" aria-label="Facebook" className="social-icon"><Facebook className="w-6 h-6" /></a>
                <a href="#" aria-label="Instagram" className="social-icon"><Instagram className="w-6 h-6" /></a>
                <a href="#" aria-label="Twitter" className="social-icon"><Twitter className="w-6 h-6" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
