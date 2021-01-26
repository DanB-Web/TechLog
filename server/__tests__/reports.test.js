// Internal Modules
const app = require('../app.js');
const Report = require('../models/reports.models/reports.schema');
// Mock Data 
const { MockReport } = require('./__mocks__/reports.mocks');
// Package Dependencies
const supertest = require('supertest');
const mongoose = require('mongoose');

const request = supertest(app); // simulates http request

const routes = {
  reports: '/reports'
}

afterAll(() => {
  mongoose.connection.close();
})

//============REPORTS ROUTES==============

// GET /allreports
describe('===REPORTS ROUTES===', () => {

  describe('Route -> GET /reports (all)', () => {
  
    let mockReport;
    let createdReport;
    let findSpy;
    let response;

    beforeEach(async (done) => {
      mockReport = new MockReport();
      createdReport = await Report.create(mockReport);
      findSpy = jest.spyOn(Report, 'find');
      response = await request.get(routes.reports);
      done();
    })

    afterEach(async (done) => {
      await Report.findByIdAndDelete(createdReport._id.toString());
      done();
    })
    
    it('should call Report.find() once', (done) => {
      expect(findSpy).toHaveBeenCalledTimes(1);
      done();
    });

    it('should return an array', (done) => {
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      done();
    });

    it('if db populated, should return an array of Reports', (done) => {
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({_id: createdReport._id.toString()})
        ])
      );
      done();
    });
  });

  //get
  describe('Route -> GET /reports/:id', () => {

    let mockReport;
    let createdReport;
    let spyFindOne;
    let response;

    beforeEach(async (done) => {
      mockReport = new MockReport();
      createdReport = await Report.create(mockReport);
      spyFindOne = jest.spyOn(Report, 'findOne');
      response = await request.get(`${routes.reports}/${mockReport.reportId}`);
      done();
    });

    afterEach(async (done) => {
      await Report.findByIdAndDelete(createdReport._id.toString());
      done();
    });

    it('should call Report.findOne once', (done) => {
      expect(spyFindOne).toHaveBeenCalledTimes(1);
      done();
    });
    
    it('should return a report that exists in the db', (done) => {
      expect(response.status).toBe(200);
      expect(response.body._id).toEqual(createdReport._id.toString());
      done();
    });

    it('should return a single report (as object)', (done) => {
      expect(Array.isArray(response.body)).toBe(false);
      done();
    });

  });

  describe('ROUTE -> POST /reports', () => {

    let mockReport;
    let response;
    let spyCreate;

    beforeAll(async (done) => {
      mockReport = new MockReport('POST TEST');
      spyCreate = jest.spyOn(Report, 'create');
      response = await request.post(routes.reports).send(mockReport);
      done();
    });

    afterAll(async (done) => {
      await Report.deleteOne({ _id: response.body._id});
      done();
    })

    it('should avoid duplication by calling Report.create() once', (done) => {
      expect(spyCreate).toHaveBeenCalledTimes(1);
      done();
    });

    it('should return the saved report in the response body', (done) => {
      expect(response.status).toBe(201);
      expect(mockReport.title).toEqual(response.body.title);
      done();
    });

    it('should store the request body in the db', async (done) => {
      const searchResult = await Report.findOne({ reportId: response.body.reportId});      
      expect(response.body.title).toEqual(searchResult.title);
      done();
    });
  });

  describe('PUT /reports', () => {

    let mockReport;
    let createdReport;
    let updateSpy;
    let response;

    beforeEach(async (done) => {
      mockReport = new MockReport('TEST');
      updateSpy = jest.spyOn(Report, 'findByIdAndUpdate');
      createdReport = Report.create(mockReport);
      mockReport.title = 'UPDATE TEST';
      mockReport._id = (await createdReport)._id.toString();
      response = await request.put(routes.reports).send(mockReport);
      done();
    });

    afterEach(async (done) => {
      await Report.deleteOne({ _id: mockReport._id});
      done();
    });
    
    it('should call the update function once', (done) => {
      expect(updateSpy).toBeCalledTimes(1);
      done();
    });

    it('should update an existing report in the db & send', async (done) => {
      expect(response.body._id).toEqual(mockReport._id);
      const updateSearch = await Report.findOne({ _id: response.body._id});
      expect(updateSearch.title).toBe(mockReport.title);
      done();
    });

    it('should not create a new report if one does not exist', async (done) => {
      const testReport = new MockReport('SHOULD NOT APPEAR');
      const testResponse = await request.put(routes.reports).send(testReport);
      expect(Object.keys(testResponse.body)).toEqual([]);
      done();
    });
  });

  describe('DELETE /report/:id', () => {

    let mockReportSafe;
    let mockReportDelete;
    let createdReportSafe;
    let createdReportDelete;
    let responseDelete;
    let deleteSpy;

    beforeEach(async (done) => {
      mockReportDelete = new MockReport('TEST DELETE');
      createdReportDelete = await Report.create(mockReportDelete);
      mockReportSafe = new MockReport('SAFE');
      createdReportSafe = await Report.create(mockReportSafe);
      deleteSpy = jest.spyOn(Report, 'findByIdAndDelete');
      responseDelete = await request.delete(`${routes.reports}/${createdReportDelete._id}`);
      done();
    });

    afterEach(async (done) => {
      await Report.findByIdAndDelete(createdReportDelete._id.toString());
      await Report.findByIdAndDelete(createdReportSafe._id.toString());
      done();
    });

    it('should call the delete function once per request ONLY', (done) => {
      expect(deleteSpy).toBeCalledTimes(1);
      done();
    });

    it('should delete an existing report in the db', async (done) => {
      const search = await Report.find({ _id: createdReportDelete._id.toString() });
      expect(search.length).toBe(0);
      done();
    });
    
    it('should not delete a report with a different id to parameter', async (done) => {
      const safeReportSearch = await Report.find({ _id: createdReportSafe._id.toString() }); // find safe-report
      const deleteReportSearch = await Report.findOne({ _id: createdReportDelete._id.toString() });
      expect(safeReportSearch[0].title).toBe(createdReportSafe.title);
      expect(deleteReportSearch).toBe(null);
      done();
    });

    it('should return the deleted report', async (done) => {
      expect(responseDelete.body._id).toBe(createdReportDelete._id.toString());
      done();
    });
  });

  describe('Integrated Test of /report', () => {
    let mockReport;
    let postResponse;

    beforeEach((done) => {
      mockReport = new MockReport('INTEGRATED TESTS');
      done();
    });

    afterEach(async (done) => {
      await Report.findByIdAndDelete(postResponse.body._id);
      done();
    });

    it('should be able to post, get, update & delete', async (done) => {
      postResponse = await request.post(routes.reports).send(mockReport);
      const getAllResponses = await request.get(routes.reports);
      const filteredResponse = getAllResponses.body.find((res) => {
        return res._id === postResponse.body._id;
      });
      const getSingleResponse = await request.get(`${routes.reports}/${filteredResponse.reportId}`);
      expect(getSingleResponse.body).toEqual(filteredResponse);
      getSingleResponse.body.title = 'UPDATED INTEGRATION TEST';
      const updateResponse = await request.put(routes.reports).send(getSingleResponse.body);
      const deletedResponse = await request.delete(`${routes.reports}/${updateResponse.body._id}`);
      expect(getSingleResponse.body).toEqual(deletedResponse.body);

      const search = Report.findOne({ _id: postResponse.body._id});
      expect(search.title).toBe(undefined);
      done();
    });
  });
});