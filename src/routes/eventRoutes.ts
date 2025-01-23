// backend/src/routes/eventRoutes.ts
import express, { Router } from 'express';
import { 
  getAllEvents, 
  getEventById, 
  createEvent, 
  updateEvent, 
  deleteEvent 
} from '../controllers/eventController';

const router: Router = express.Router();


router.get('/', getAllEvents as express.RequestHandler);
router.get('/:id', getEventById as express.RequestHandler);

router.post('/', createEvent as express.RequestHandler);
router.put('/:id', updateEvent as express.RequestHandler);
router.delete('/:id', deleteEvent as express.RequestHandler);

export default router;