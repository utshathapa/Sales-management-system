import React, { useState } from 'react';
import { Mail, Phone, MapPin, Twitter, Facebook, Instagram, Send } from 'lucide-react';
import { useTheme } from '../hooks/useTheme'; // adjust path if needed

const Contact = () => {
  const { theme } = useTheme(); // just to ensure hook works; CSS responds to data-theme on <html>

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [message, setMessage] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

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
    <div className="contact-container">
      <style jsx="true">{`
        /* ---------- Theme variables (light default) ---------- */
        :root {
          --bg: #E6E6FA;
          --panel-bg: #ffffff;
          --text: #4B0082;
          --muted: #6b6b86;
          --accent: #C71585;
          --input-bg: #fff;
          --input-border: #C7BFFB;
          --card-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
          --info-bg: #F8F7FF;
        }

        /* ---------- Dark theme (activated via data-theme="dark" on <html>) ---------- */
        :root[data-theme='dark'] {
          --bg: #0b1020;
          --panel-bg: #121217;
          --text: #f0f0f0;
          --muted: #bfc4d6;
          --accent: #ff6fb2;
          --input-bg: #1a1a1a;
          --input-border: #444;
          --card-shadow: 0 8px 20px rgba(0,0,0,0.6);
          --info-bg: #151521;
        }

        /* ---------- Layout ---------- */
        .contact-container {
          min-height: 100vh;
          background-color: var(--bg);
          padding: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', sans-serif;
          color: var(--text);
        }
        @media (min-width: 640px) {
          .contact-container { padding: 2.5rem; }
        }

        .main-card {
          background-color: var(--panel-bg);
          box-shadow: var(--card-shadow);
          border-radius: 1rem;
          width: 100%;
          max-width: 80rem;
          overflow: hidden;
        }

        .grid-layout { display: grid; grid-template-columns: 1fr; }
        @media (min-width: 1024px) { .grid-layout { grid-template-columns: repeat(2, 1fr); } }

        /* ---------- Form ---------- */
        .form-section { padding: 3rem; }
        .form-heading { font-size: 2.25rem; font-weight: 800; margin-bottom: 1rem; letter-spacing: -0.025em; color: var(--text); }
        .form-paragraph { margin-bottom: 2rem; color: var(--muted); }

        .form-label { display:block; font-size:0.875rem; font-weight:500; margin-bottom:0.25rem; color: var(--muted); }
        .form-input, .form-textarea {
          width:100%; padding:0.75rem; margin-bottom:1rem;
          border:1px solid var(--input-border); border-radius:0.5rem;
          transition:border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          box-sizing:border-box;
          background: var(--input-bg);
          color: var(--text);
        }
        .form-input::placeholder, .form-textarea::placeholder { color: #9C95D4; }
        .form-input:focus, .form-textarea:focus { border-color: var(--accent); box-shadow: 0 0 0 4px rgba(199,21,133,0.12); outline:none; }

        .status-message {
          padding:0.75rem; margin-bottom:1rem; border-radius:0.5rem;
          font-size:0.95rem; font-weight:600; text-align:center;
          opacity: ${message ? 1 : 0}; transition:opacity 0.3s ease-in-out;
        }
        .status-message.success { background-color:#E9FCEF; color:#1E8449; border:1px solid #A9DFBF; }
        :root[data-theme='dark'] .status-message.success { background-color: rgba(30,132,73,0.12); color: #9fe0b4; border: 1px solid rgba(30,132,73,0.2); }

        .status-message.error { background-color:#FAEAEA; color:#943126; border:1px solid #F0A0A0; }
        :root[data-theme='dark'] .status-message.error { background-color: rgba(148,49,38,0.12); color: #ffb3aa; border: 1px solid rgba(148,49,38,0.2); }

        .status-message.sending { background-color:#FEF9E7; color:#D68910; border:1px solid #F7DC6F; }
        :root[data-theme='dark'] .status-message.sending { background-color: rgba(214,137,16,0.08); color: #ffd98a; border:1px solid rgba(214,137,16,0.15); }

        .submit-button {
          width:100%; padding:0.75rem; margin-top:0.5rem;
          font-size:1.125rem; font-weight:600; color:white; background-color:var(--accent);
          border-radius:0.5rem; display:flex; align-items:center; justify-content:center;
          transition: background-color 0.2s ease-in-out; cursor:pointer; border:none;
        }
        .submit-button:hover:not(:disabled) { filter:brightness(0.95); }
        .submit-button:disabled { opacity:0.8; cursor:not-allowed; }

        /* ---------- Info ---------- */
        .info-section { padding:3rem; background-color: var(--info-bg); display:flex; flex-direction:column; justify-content:center; }
        .info-heading { font-size:1.875rem; font-weight:700; margin-bottom:1.5rem; color: var(--text); }
        .info-detail { display:flex; align-items:flex-start; margin-bottom:1.5rem; color: var(--muted); }
        .info-detail p { margin-top:0.25rem; color: var(--muted); }
        .info-icon { width:1.5rem; height:1.5rem; margin-right:0.75rem; color:var(--accent); flex-shrink:0; margin-top:0.25rem; }
        .info-detail h3 { font-weight:600; color: var(--text); }
        .social-links { margin-top:2.5rem; padding-top:1.5rem; border-top:1px solid rgba(0,0,0,0.06); }
        :root[data-theme='dark'] .social-links { border-top:1px solid rgba(255,255,255,0.04); }
        .social-icon { transition: color 0.15s; color: var(--muted); }
        .social-icon:hover { color: var(--accent); }

        /* small utilities (only used for lucide icons spacing) */
        .flex { display:flex; }
        .items-center { align-items:center; }
        .mr-2 { margin-right:0.5rem; }
        .ml-1 { margin-left:0.25rem; }
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
                    <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25"></circle>
                      <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    <span style={{ marginLeft: 10 }}>Sending...</span>
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send className="mr-2" /> Send Message
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
              <div style={{ display: 'flex', gap: 12 }}>
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
