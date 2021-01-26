describe('===SEARCH REPORT TEST===', () => {

  // stubbed (mock api call) test with fixtures 
  it('should load reports on start', () => {
    cy.intercept('GET', 'http://localhost:3002/reports', { fixture: 'reports.json' }).as('getAllReports');
    cy.visit('http://localhost:3000/search');
    cy.wait('@getAllReports'); // wait for get request
    cy.get('.searchitem__container').should('have.length', 2);
  });

  // Testing actual db
  it('should receive reports from the db', async () => {
    const reportMock = {
      title: "Post Report X",
      description: "test test test",
      tags: [
        "tag1",
        "tag2"
      ],
      steps: [
        "step1",
        "step2"
      ],
      images: [],
      reportId: 98765432,
    }
    const response = await cy.request('POST', 'http://localhost:3002/reports', reportMock);
    cy.visit('http://localhost:3000/search');
    cy.get('.searchitem__container:last-of-type h3').should('contain', reportMock.title);
    cy.request('DELETE', `http://localhost:3002/reports/${response.body._id}`);
    cy.visit('http://localhost:3000/search');
    cy.get('.searchitem__container:last-of-type h3').should('not.contain', reportMock.title);
  });

  it.only('should remove items manually through More Details modal', async () => {
    const reportMock = {
      title: "New Deletable Report",
      description: "test test test",
      tags: [
        "tag1",
        "tag2"
      ],
      steps: [
        "step1",
        "step2"
      ],
      images: [],
      reportId: 98765432,
    }
    const response = await cy.request('POST', 'http://localhost:3002/reports', reportMock);
    cy.visit('http://localhost:3000/search');
    // cy.get('.searchitem__container:last-of-type h3').should('contain', reportMock.title)
    cy.get('.searchitem__container:last-of-type button')
      .click()
    cy.get('.modal__container button').contains(/delete/i)
      .click();
    cy.get('.searchitem__container:last-of-type h3').should('not.contain', reportMock.title);

  });


});