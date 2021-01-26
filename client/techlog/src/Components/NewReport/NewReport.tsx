import './NewReport.css';
import rest from '../../Utils/rest';
import Form from '../../Form/Form'
import { IReport } from 'src/src/Utils/interfaces';

const NewReport = () => {
  const formSubmit = async (title: string, searchTags: string[], description: string, steps: string[], pics: File[]) => {
    await rest.postReport(title, searchTags, description, steps, pics);
  }

  const emptyForm : IReport = {
    title       :  '',
    description :  '',
    tags        :  [],
    steps       :  []
  }

  return (
    <div className="new__report__container">
      <Form
        form ={emptyForm}
        formSubmit={formSubmit}
        formPatch={(title:string, searchTags:string[], description:string, steps:string[]) => {}}
      />
    </div>
  )
}

export default NewReport;
