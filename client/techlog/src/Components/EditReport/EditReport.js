import React, { useState } from 'react';

import './EditReport.css';

import rest from '../../Utils/rest';

import GetForm from '../../Form/GetForm'
import Form from '../../Form/Form'

const EditReport = ({editReport}) => {

  const [formEditState, setFormEditState] = useState(null);

  const formFetch = async (reportId) => {
    const report = await rest.getReport(reportId);
    setFormEditState(report);
  }

  const formPatch = (title, searchTags, description, steps) => {
    const { _id } = formEditState[0];
    const formCopy = { _id, title, tags:searchTags, description, steps}
    rest.editReport(formCopy);
    setFormEditState(null);
  } 

  return (
    <div className="edit__report__container">
    {(formEditState !== null && Array.isArray(formEditState)) ? 
      <Form form={formEditState[0]} formPatch={formPatch}/> :
      <GetForm editReport={editReport} formFetch={formFetch}/>
    }
    </div>
  )
}

export default EditReport;