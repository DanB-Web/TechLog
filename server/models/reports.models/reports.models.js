const Reports = require('./reports.schema');

const allReports = () => {
  const reply = Reports.find({});
  return reply;
}

const getReport = (reportId) => {
  const reply = Reports.findOne({ reportId });
  return reply;
}

const generateReportId = (rounds = 1) => {
  let uid = '';
  while (rounds > 0) {
    uid += Math.random().toString(10).substring(2, 10);
    rounds -= 1;
  }
  return +uid;
};

const newReport = async (title, description, tags, steps, images) => {
  
  const reportId = generateReportId(); // new reportID
  let isUnique = false;
  let existingReportId = [];
  while (!isUnique) {
    existingReportId = await Reports.findOne({reportId}); // check unique
    if (!existingReportId) isUnique = true;
  }
  return Reports.create({reportId, title, description, tags, steps, images});
}


const editReport = (id, title, description, tags, steps, comments) => {
  const reply = Reports.findByIdAndUpdate(id, {title, description, tags, steps, comments});
  return reply;
}

const deleteReport = (id) => {
  const reply = Reports.findByIdAndDelete({_id:id})
  return reply;
}

module.exports = {
  allReports,
  getReport,
  newReport,
  editReport,
  deleteReport,
  generateReportId
}