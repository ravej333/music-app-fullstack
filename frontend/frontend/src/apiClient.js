import axios from 'axios';
import { supabase } from './supabaseClient.js'; // Import your Supabase client

// This is the base URL of your backend server
const API_BASE_URL = 'http://localhost:9090/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// IMPORTANT: This is the interceptor that adds the auth token.
// It runs before every single request is sent.
apiClient.interceptors.request.use(
  async (config) => {
    // Get the current session from Supabase
    const { data: { session } } = await supabase.auth.getSession();

    // If a session and access token exist, add it to the Authorization header
    if (session?.access_token) {
      config.headers['Authorization'] = `Bearer ${session.access_token}`;
    }

    return config;
  },
  (error) => {
    // Handle any errors during the request setup
    return Promise.reject(error);
  }
);

export default apiClient;