import { useNavigate } from "react-router-dom";
import "../css/Landing.css";
import landingImage from '../assets/LandingImage.png'; 

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-page-wrapper">
      
      <div className="landing-container-split">
        
        {/* LEFT COLUMN: The White Content Box */}
        <div className="content-panel">
          <h1> Welcome✨🌸💖</h1>
  
           <p>Please Sign Up to Continue to our exclusive gallery and start customizing your exquisite resin art decor. ✨📦</p>
               
          <div className="landing-buttons">
            <button onClick={() => navigate("/signup")}>Signup</button>
            <button onClick={() => navigate("/login")}>Login</button>
          </div>
        </div>

        {/* RIGHT COLUMN: The Image Panel */}
        <div className="image-panel">
          <img 
            src={landingImage} 
            alt="Creativity and Flowers" 
            className="split-image" 
          />
        </div>

      </div>
    </div>
  );
}

export default Landing;