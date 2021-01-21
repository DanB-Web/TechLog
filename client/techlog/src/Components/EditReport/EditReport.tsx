import * as React from 'react';
import { useState } from 'react';

import './EditReport.css';

import rest from '../../Utils/rest';

import GetForm from '../../Form/GetForm'
import Form from '../../Form/Form'

const EditReport = ({editReport}) => {

  const [formEditState, setFormEdit] = useState(null);

  const formFetch = async (reportId: string) => {
    const report = await rest.getReport(reportId);
    setFormEdit(report);
  }

  const formPatch = (title, searchTags, description, steps) => {
    const { _id } = formEditState[0];
    const formCopy = { _id, title, tags:searchTags, description, steps}
    rest.editReport(formCopy);
    setFormEdit(null);
  } 

  return (
    <div className="edit__report__container">
    {formEditState === null ? <GetForm editReport={editReport} formFetch={formFetch}/> :
    <Form form={formEditState[0]} formPatch={formPatch}/>}
  </div>
  )
}

export default EditReport;