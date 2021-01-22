import * as React from 'react';

import './GetForm.css';

interface GetFormProps {
  editReport: string,
  formFetch: (id: string) => void
}

const GetForm : React.FC<GetFormProps> = ({ editReport, formFetch }) => {

  const getReport = () => {
    const reportId = document.getElementById('report__id');
    formFetch(String(reportId!.value));
    reportId!.value = '' as any;
  }

  const pasteId = () => {
    const reportId = document.getElementById('report__id');
    reportId!.value = editReport as any ;
  }

  return (
    <div className="getform__container">
      <div className="getform__input">
        <h3>REPORT ID:</h3>
        <input id="report__id" name="report__id" type="text"></input>
        <button onClick={getReport}>FIND REPORT</button>
        {editReport &&
          <button onClick={pasteId}>PASTE ID</button>
        }
      </div>
    </div>
  )
}

export default GetForm;
