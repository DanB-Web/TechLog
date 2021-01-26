import { useState, useEffect } from 'react';
import './EditReport.css';
import rest from '../../Utils/rest';
import { IReport } from '../../Utils/interfaces';
import Form from '../../Form/Form'
import { useRouteMatch } from 'react-router-dom';

const EditReport = () => {
  const match = useRouteMatch();
  const id : string = (match.params as any).id;
  const [formEditState, setFormEdit] = useState<IReport | null>(null);
  useEffect(() => {
    formFetch(id)
  }, []) 

  const formFetch = async (reportId: string) => {
    const report = await rest.getReport(reportId);
    if (report) setFormEdit(report);
    else setFormEdit(null);
  }

  const formPatch = async (title: string, searchTags: string[], description:string, steps: string[]) => {
    if (formEditState){
      const { _id } = formEditState;
      const formCopy = { _id, title, tags:searchTags, description, steps}
      await rest.editReport(formCopy);
      setFormEdit(null);
    }
  }

  return (
    <div className="edit__report__container">
    {
    formEditState === null ? null :
    <Form form={formEditState} formPatch={formPatch} formSubmit={(title, searchTags, description, steps, pics) => {}}/>
    }
  </div>
  )
}

export default EditReport;
