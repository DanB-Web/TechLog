import * as React from 'react';
import { useState } from 'react';

import './EditReport.css';

import rest from '../../Utils/rest';

import { IReport } from '../../Utils/interfaces';
import GetForm from '../../Form/GetForm'
import Form from '../../Form/Form'

interface EditReportProps {
  editReport: string;
}

const EditReport : React.FC<EditReportProps> = ({editReport}) => {

  const [formEditState, setFormEdit] = useState<IReport | null>(null);

  const formFetch = async (reportId: string) => {
    const report = await rest.getReport(reportId);
    if (report) setFormEdit(report);
    else setFormEdit(null);
  }

  const formPatch = (title: string, searchTags: string[], description:string, steps: string[]) => {
    if (formEditState){
      const { _id } = formEditState;
      const formCopy = { _id, title, tags:searchTags, description, steps}
      rest.editReport(formCopy);
      setFormEdit(null);
    }
  }

  return (
    <div className="edit__report__container">
    {
    formEditState === null ? <GetForm editReport={editReport} formFetch={formFetch}/> :
    <Form form={formEditState} formPatch={formPatch} formSubmit={(title, searchTags, description, steps, pics) => {}}/>
    }
  </div>
  )
}

export default EditReport;
