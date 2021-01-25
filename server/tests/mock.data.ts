import { IReport } from "models/reports.models/reports.schema";

export const report : IReport = {
  title: 'Test Report',
  description: 'Sample description',
  tags: ['tag1', 'tag2'],
  steps: ['step1', 'step2'],
  images: ['http://img.png'],
  __v: 0
}


export const newReport : IReport = {
  title: 'New Report',
  description: 'Sample description',
  tags: ['tag1', 'tag2'],
  steps: ['step1', 'step2'],
  images: ['http://img.png'],
  __v: 0
}

export const reportUpdate : IReport = {
  title: 'Test Report Updated',
  description: 'Sample description updated',
  tags: ['tag1', 'tag2'],
  steps: ['step1', 'step2'],
  images: ['http://img.png']
}

export const invalidId : string = '6005c760ca804d212d722dc5';
