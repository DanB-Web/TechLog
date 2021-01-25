const app = require('../app.js');
const supertest = require('supertest');

const Report = require('../models/reports.models/reports.schema');
const request = supertest(app); // simulates http request

/**
 * GET -> /allreports 
*/
describe('Route -> /allreports', () => {

  const mocks = {
    report: {
      reportId: 23456234, 
      title: 'NEWtest', 
      description: 'my desc', 
      tags: ['help'],
      steps: ['do this'], 
      images: []
    }
  };
 

  it('should return an array', async (done) => {
    const response = await request.get('/allreports');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    done();
  });

  it('if db populated, should return an array of Reports', async (done) => {
    
    const reportMock = await Report.create(mocks.report);

    const mockId = reportMock._id.toString();

    const response = await request.get('/allreports'); // response is mocked
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({_id: mockId})
      ])
    );
    await Report.deleteOne({_id: mockId});
    done();
  });

  it('should call Report.find() once', async (done) => {
    Report.find = jest.fn();
    const response = await request.get('/allreports');
    expect(Report.find).toHaveBeenCalledTimes(1);
    done();
  });
 
});

describe('Route -> /getreport/:id', () => {

  const mock = {
    report: {
      reportId: 48489356, 
      title: 'NEWtest', 
      description: 'my desc', 
      tags: ['help'],
      steps: ['do this'], 
      images: []
    }
  };

  
  it('should return a report that exists in the db', async (done) => {
    const newReportMock = await Report.create(mock.report);
    const response = await request.get(`/getReport/${mock.reportId}`);
    expect(response.status).toBe(200);
    expect(response.body._id).toEqual(newReportMock._id.toString());
    done();
  });

  it('should return a single report', async (done) => {
    const response = await request.get(`/getReport/${mock.reportId}`);
    expect(Array.isArray(response.body)).toBe(false);
  });

  it('should call Report.findOne once', async (done) => {
    Report.findOne = jest.fn();
    const response = await request.get(`/getReport/${mock.reportId}`);
    expect(Report.findOne).toHaveBeenCalledTimes(1);

  });
});

// describe('ROUTE -> /postreport', )

// router.post('/postreport', reports.newReport);

// router.patch('/editreport', authMiddleware, reports.editReport);

// router.delete('/deletereport/:id', authMiddleware, reports.deleteReport);


