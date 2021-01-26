class MockReport {
  reportId = 0; 
  title = '';
  description = 'test description';
  tags = ['tag1', 'tag2', 'tag3'];
  steps = ['step1', 'step2'];
  images = [];

  constructor (title) {
    this.title = title || 'TEST';
    this.generateReportId();
  }

  generateReportId (rounds = 1) {
    let uid = '';
    while (rounds > 0) {
      uid += Math.random().toString(10).substring(2, 10);
      rounds -= 1;
    }
    this.reportId = +uid;
  };
}

module.exports = {
  MockReport
}