import axios from 'axios';

// Function to set the default Authorization header
export const setAuthToken = (token) => {
    if (token) {
        // Apply the token to the header for all requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        // If no token, delete the Authorization header
        delete axios.defaults.headers.common['Authorization'];
    }
};

// Check for a token on application load and apply it
const token = localStorage.getItem('auth_token');
if (token) {
    setAuthToken(token);
}
