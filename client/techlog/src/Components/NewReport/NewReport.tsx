import './NewReport.css';

import rest from '../../Utils/rest';

import Form from '../../Form/Form'

const NewReport = () => {

  const formSubmit = async (title: string, searchTags: string[], description: string, steps: string[], pics: HTMLInputElement[]) => {
    const filterPics = pics.filter(pic => pic.files!.length !== 0);
    await rest.postReport(title, searchTags, description, steps, filterPics);
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
