// backend/src/routes/eventRoutes.ts
import express, { Router } from 'express';

import { upload } from '../config/multer'
import { 
  getAllEvents, 
  getEventById, 
  createEvent, 
  updateEvent, 
  deleteEvent 
} from '../controllers/eventController';

const router: Router = express.Router();

// Explicitly type the route handlers
router.get('/', getAllEvents as express.RequestHandler);
router.get('/:id', getEventById as express.RequestHandler);

router.post('/', upload.single('image'), createEvent as express.RequestHandler);
router.put('/:id', upload.single('image'), updateEvent as express.RequestHandler);
router.delete('/:id', deleteEvent as express.RequestHandler);

export default router;