import React from 'react';

import './NewReport.css';

import rest from '../../Utils/rest';

import Form from '../../Form/Form'

const NewReport = () => {

  const formSubmit = async (title, searchTags, description, steps, pics) => {
    const filterPics = [...pics].filter(pic => pic.files.length !== 0);
    console.log(title, searchTags, description, steps, pics);
    await rest.postReport(title, searchTags, description, steps, filterPics);
    // * move to form component?
  }

  return (
    <div data-testid="newReport" className="new__report__container">
      <Form
        formSubmit={formSubmit}
      />
    </div>
  )
}

export default NewReport;