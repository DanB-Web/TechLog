import request from 'supertest';
import { expect } from 'chai';

import Report from '../../models/reports.models/reports.schema'
import server from '../../index';
import * as mock from '../mock.data';



describe('Routes', () => {

  let reportId : string;

  beforeEach(async () => {
    // Add a single report to the database before each test
    const report = await Report.create(mock.report);
    reportId = report._id.toString();
  });

  afterEach(async() => {
    // Empty the database after each test
    await Report.deleteMany({});
  });

  describe('Get All Reports', () => {

    it('Should return the list of reports in the database', async () => {
      const response  = await request(server).get('/allreports');
      expect(response.status).equal(200);
      expect(response.body.length).equal(1);
      expect(response.body[0]._id).equal(reportId);
    });

  });

  describe('Get A Report', () => {

    it('Should return an existing report when searched by id', async () => {
      const response  = await request(server).get(`/getreport/${reportId}`);
      expect(response.status).equal(200);
      expect(response.body._id).equal(reportId);
    });

    it('Should return 404 if a non valid id is used', async () => {
      let response  = await request(server).get(`/getreport/invalid`);
      expect(response.status).equal(404);
      response  = await request(server).get(`/getreport/6005c760ca804d212d722dc5`);
      expect(response.status).equal(404);
    });

  });

  describe('Create A Report', () => {

    it('Should return a newly created report if valid data used', async () => {
      const response  = await request(server).post('/postreport/')
        .send(mock.newReport);
      expect(response.status).equal(201);
      expect(response.body._id).to.not.equal(undefined);
      expect(response.body.title).equal(mock.newReport.title);
    });

    it('Should return 400 if a non valid id is used', async () => {
      let response  = await request(server).post(`/postreport`)
        .send({title: null});
      expect(response.status).equal(400);
    });

  });

  describe('Edit A Report', () => {

    it('Should return an updated report if valid data and id are used', async () => {
      const response  = await request(server).patch(`/editreport`)
        .send({_id:reportId, ...mock.reportUpdate});
      expect(response.status).equal(200);
      expect(response.body._id).equal(reportId);
      expect(response.body.title).equal(mock.reportUpdate.title);
    });

    it('Should return 404 if a non valid id is used', async () => {
      let response  = await request(server).patch(`/editreport`)
      .send({_id:'6005c760ca804d212d722dc5', ...mock.reportUpdate});
      expect(response.status).equal(404);
    });

  });

  describe('Delete A Report', () => {

    it('Should return an updated report if valid data and id are used', async () => {
      const response  = await request(server).delete(`/deletereport/${reportId}`);
      expect(response.status).equal(200);
      expect(response.body._id).equal(reportId);
      const reportsInDB = await Report.find();
      expect(reportsInDB.length).equal(0);
    });

    it('Should return 404 if a non valid id is used', async () => {
      let response  = await request(server).delete(`/deletereport/6005c760ca804d212d722dc5`);
      expect(response.status).equal(404);
    });

  });
});
