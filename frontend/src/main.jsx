import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './hooks/useAuth'; // ✅ import AuthProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>   {/* ✅ wrap your App with AuthProvider */}
      <App />
    </AuthProvider>
  </StrictMode>
);
