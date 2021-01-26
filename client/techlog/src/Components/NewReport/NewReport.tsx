import './NewReport.css';

import rest from '../../Utils/rest';

import Form from '../../Form/Form'

const NewReport = () => {

  const formSubmit = async (title: string, searchTags: string[], description: string, steps: string[], pics: File[]) => {
    await rest.postReport(title, searchTags, description, steps, pics);
  }

  return (
    <div className="new__report__container">
      <Form
        formSubmit={formSubmit}
        formPatch={(title:string, searchTags:string[], description:string, steps:string[]) => {}}
      />
    </div>
  )
}

export default NewReport;
