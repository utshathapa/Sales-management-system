import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme"; // Adjust path as needed

const ProtectedRoute = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const isDark = theme === 'dark';
  
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;
    if (!user || !user.name) {
      setShowModal(true);
    }
  }, []);

  const handleLoginClick = () => {
    setShowModal(false);
    navigate("/login");
  };

  const handleHomeClick = () => {
    setShowModal(false);
    setShouldRedirect(true);
  };

  if (shouldRedirect) {
    return <Navigate to="/" replace />;
  }

  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  // Theme colors
  const colors = {
    light: {
      modalBg: '#f8f7ff',
      border: '#C483F0',
      iconBg: '#e9d5f7',
      iconColor: '#C483F0',
      headingColor: '#1e293b',
      textColor: '#6b7280',
      primaryBtn: '#C483F0',
      primaryBtnHover: '#7e50aa',
      arrowColor: '#C483F0',
      arrowHover: '#7e50aa'
    },
    dark: {
      modalBg: '#1e293b',
      border: '#C483F0',
      iconBg: '#374151',
      iconColor: '#C483F0',
      headingColor: '#f8f7ff',
      textColor: '#9ca3af',
      primaryBtn: '#C483F0',
      primaryBtnHover: '#7e50aa',
      arrowColor: '#C483F0',
      arrowHover: '#7e50aa'
    }
  };

  const currentColors = isDark ? colors.dark : colors.light;

  if (!user || !user.name) {
    return (
      <>
        {showModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}>
            <div style={{
              backgroundColor: currentColors.modalBg,
              borderRadius: '12px',
              padding: '32px',
              maxWidth: '380px',
              width: '90%',
              boxShadow: isDark 
                ? '0 10px 25px rgba(0, 0, 0, 0.5)' 
                : '0 10px 25px rgba(196, 131, 240, 0.3)',
              border: `2px solid ${currentColors.border}`,
              transition: 'all 0.3s ease'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: currentColors.iconBg,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '16px'
                }}>
                  <svg style={{ width: '26px', height: '26px', color: currentColors.iconColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h2 style={{ 
                  fontSize: '22px', 
                  fontWeight: '600', 
                  color: currentColors.headingColor, 
                  margin: 0 
                }}>
                  Authentication Required
                </h2>
              </div>
              
              <p style={{ 
                color: currentColors.textColor, 
                marginBottom: '28px', 
                fontSize: '15px',
                lineHeight: '1.5'
              }}>
                Please login to continue accessing this page.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button
                  onClick={handleLoginClick}
                  style={{
                    backgroundColor: currentColors.primaryBtn,
                    color: 'white',
                    fontWeight: '600',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '15px',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = currentColors.primaryBtnHover}
                  onMouseOut={(e) => e.target.style.backgroundColor = currentColors.primaryBtn}
                >
                  Go to Login
                </button>
                
                <button
                  onClick={handleHomeClick}
                  style={{
                    backgroundColor: 'transparent',
                    color: currentColors.arrowColor,
                    fontWeight: '500',
                    padding: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => e.target.style.color = currentColors.arrowHover}
                  onMouseOut={(e) => e.target.style.color = currentColors.arrowColor}
                >
                  <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return children;
};

export default ProtectedRoute;