import React from 'react';

import './GetForm.css';

const GetForm = ({ editReport, formFetch }) => {

  const getReport = () => {
    const reportId = document.getElementById('report__id');
    formFetch(reportId.value);
    reportId.value = '';
  }

  const pasteId = () => {
    const reportId = document.getElementById('report__id');
    reportId.value = editReport;
  }

  return (
    <div className="getform__container">
      <div className="getform__input">
        <h3>REPORT ID:</h3>
        <input id="report__id" name="report__id" type="text"></input>
        <button onClick={getReport}>FIND REPORT</button>
        {(editReport !== 0) ? 
          <button onClick={pasteId}>PASTE ID</button> :
          null
        }
      </div>
    </div>
  )
}

export default GetForm;