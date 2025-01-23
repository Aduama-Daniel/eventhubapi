import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

const EventSchema = new Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true }
});

export default mongoose.model<IEvent>('Event', EventSchema);