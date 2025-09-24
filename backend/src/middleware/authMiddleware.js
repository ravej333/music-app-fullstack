import { supabase } from '../config/supabaseClient.js';

export const checkAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: No token provided.' });
    }

    const token = authHeader.split(' ')[1];

    // Verify the token with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token.' });
    }

    // Attach user information to the request for later use
    req.user = user;
    
    // If token is valid, proceed to the next function (the controller)
    next();
  } catch (error) {
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
};