import React, {useState} from 'react';

import './GetForm.css';

interface GetFormProps {
  editReport: string,
  formFetch: (id: string) => void
}

const GetForm : React.FC<GetFormProps> = ({ editReport, formFetch }) => {

  const [input, setInput] = useState<string>('');

  const handleInput = (event : React.ChangeEvent<HTMLInputElement>) : void => {
    setInput(event.target.value);
  }

  const getReport = () : void => {
    formFetch(input);
    setInput('');
  }

  const pasteId = () : void => {setInput(editReport)};

  return (
    <div className="getform__container">
      <div className="getform__input">
        <h3>REPORT ID:</h3>
        <input id="report__id" name="report__id" type="text" value={input} onChange={handleInput}/>
        <button onClick={getReport}>FIND REPORT</button>
        {editReport &&
          <button onClick={pasteId}>PASTE ID</button>
        }
      </div>
    </div>
  )
}

export default GetForm;
