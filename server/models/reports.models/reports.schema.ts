import {model, Schema, Document } from 'mongoose';

export interface IReport extends Document {
  title: string,
  description: string,
  tags: [string?],
  steps: [string?],
  images: [string?]
}

const ReportSchema: Schema = new Schema({
  title: { type: String, required: true},
  description: { type: String, required: true },
  tags: { type: [String], required: true },
  steps: { type: [String], required: false },
  images: { type: [String], required: false}
}, { autoCreate: true });

export default model<IReport>('Report', ReportSchema);
