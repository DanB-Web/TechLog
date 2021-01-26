const reports = require('../models/reports.models/reports.models');

const allReports = async (req, res) => {
  try {
    const reply = await reports.allReports();
    res.status(200).send(reply);
  } catch (err) {
    console.log('Return all reports error', err);
    res.status(500).send('Return all reports error');
  }
}

const getReport = async (req, res) => {
  try {
    const { id } = req.params;
    const reply = await reports.getReport(id);
    res.status(200).send(reply);
  } catch (err) {
    console.log('Return single report error', err);
    res.status(500).send('Return single report error');
  }
}

const newReport = async (req, res) => {
  try {
    const { title, description, tags, steps, images } = req.body;
    const reply = await reports.newReport(title, description, tags, steps, images);
    res.status(201).send(reply);
  } catch (err) {
    console.log('Create new report error', err);
    res.status(500).send('Create new report error');
  }
}

const editReport = async (req, res) => {
  try {
    const { _id, title, description, tags, steps } = req.body;
    const reply = await reports.editReport(_id, title, description, tags, steps);
    res.status(200).send(reply);     //Was using 204 but no res body :(
  } catch (err) {
    console.log('Edit report error', err);
    res.status(500).send('Edit report error');
  }
}

const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    const reply = await reports.deleteReport(id);
    res.status(200).send(reply);
  } catch (err) {
    console.log('Delete report error', err);
    res.status(500).send('Delete report error');
  }
}

module.exports = {
  allReports,
  getReport,
  newReport,
  editReport,
  deleteReport
}