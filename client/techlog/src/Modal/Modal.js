import React, {Fragment} from 'react';

import './Modal.css';

import rest from '../Utils/rest';

import Image from './Image';

const Modal = ({admin, id, title, tags, description, steps, images, reportId, toggleModal, callReports}) => {

  const deleteReport = () => {
    rest.deleteReport(id);
    callReports();
    toggleModal(); 
  }

  const closeModal =() => {
    toggleModal();
  }

  const copyToClipboard =() => {
    const idInput = document.querySelector('.modal__report-id').textContent;
    reportId(idInput);
  }

  return (
    <Fragment>
    <div className="modal__container">

      <h2>{title}</h2>

      <div className="modal__id">
        <label>Report ID: </label>
        <p className="modal__report-id">{id}</p>
        {admin && <button onClick={copyToClipboard}>COPY ID</button>}
      </div>

      <div className="modal__tags">
        <label>Tags</label>
        <ul>{tags.map((tag, index) => <li key={index}>#{tag}</li>)}</ul>
      </div>
     
      <div className="modal__main-body">
        <label>Description</label>
        <p>{description}</p>
        <label>Steps</label>
        <ul>{steps.map((step, index) => <li key={index}>&bull; {step}</li>)}</ul>
      </div>

      {images.length ? 
      <div className="modal__image-container">

        <label>Images</label>

          <div className="modal__image-container-images">
            {images.length && images.map((image, index) => <Image
              key={index}
              image = {image}
          />)}
        </div>
      </div> : null} 

      <div className="modal__buttons">
        <button onClick={closeModal}>CLOSE</button>
        {admin &&
          <button onClick={deleteReport}>DELETE</button> 
        }
      </div>
    </div>
    </Fragment>
  ) 
}

export default Modal;
