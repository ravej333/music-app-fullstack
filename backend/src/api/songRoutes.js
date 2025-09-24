import { Router } from 'express';
import { getSongs, addNewSong } from '../controllers/songController.js';
import { checkAuth } from '../middleware/authMiddleware.js'; // Import the middleware

const router = Router();

// This route is public - anyone can get the list of songs.
router.get('/', getSongs);

// This route is protected. The `checkAuth` function will run first.
// If the user is authenticated, it will then call `addNewSong`.
// If not, it will send a 401 Unauthorized error.
router.post('/', checkAuth, addNewSong);

export default router;