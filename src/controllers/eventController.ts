import { Request, Response } from 'express';
import Event, { IEvent } from '../models/Event';

export const getAllEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 6;
    const skip = (page - 1) * limit;

    const events: IEvent[] = await Event.find()
      .skip(skip)
      .limit(limit);
    
    const total = await Event.countDocuments();

    res.json({
      events,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
};

export const getEventById = async (req: Request, res: Response): Promise<void> => {
  try {
    const event: IEvent | null = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event', error });
  }
};

export const createEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const newEvent: IEvent = new Event(req.body);
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: 'Error creating event', error });
  }
};

export const updateEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedEvent) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }

    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: 'Error updating event', error });
  }
};

export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }

    await event.deleteOne();
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error });
  }
};