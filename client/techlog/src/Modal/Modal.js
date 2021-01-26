import React, { Fragment } from 'react';

import './Modal.css';

import rest from '../Utils/rest';

import Image from './Image';

const Modal = ({ admin, report, holdReportId, toggleModal, callReports }) => {
  const { _id, tags, title, images, description, steps, reportId } = report;

  const deleteReport = () => {
    rest.deleteReport(_id);
    callReports();
    toggleModal();
  }

  const closeModal = () => {
    toggleModal();
  }

  const copyToClipboard = () => {
    const idInput = document.querySelector('.modal__report-id').textContent;
    holdReportId(idInput);
  }

  return (
    <Fragment>
      <div className="modal__container">

        <h2>{title}</h2>

        <div className="modal__id">
          <label>Report ID: </label>
          <p className="modal__report-id">{reportId}</p>
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
                image={image}
              />)}
            </div>
          </div> : null}

        <div className="modal__buttons">
          <button id="close" onClick={closeModal}>CLOSE</button>
          {admin &&
            <button id="delete" onClick={deleteReport}>DELETE</button>
          }
        </div>
      </div>
    </Fragment>
  )
}

export default Modal;
