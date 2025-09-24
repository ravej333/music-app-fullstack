import { Router } from 'express';
import songRoutes from './songRoutes.js';

const router = Router();

// This is the main entry point for all API routes.
// As you add more features (like playlists), you'll add their routes here.

// Any request to /api/songs will be handled by the songRoutes file
router.use('/songs', songRoutes);

// Example for the future:
// router.use('/playlists', playlistRoutes);

export default router;