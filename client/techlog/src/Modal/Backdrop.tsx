import * as React from 'react';
import { createPortal } from 'react-dom';

import './Backdrop.css';

import Modal from './Modal';

const Backdrop = ({admin, id, title, tags, description, steps, images, reportId, toggleModal, callReports}) => {

  return createPortal (
    <div className="backdrop__container">
      <Modal admin={admin} 
             id={id} 
             title={title} 
             tags={tags}
             description={description}
             steps={steps}
             images={images}
             reportId={reportId}
             toggleModal={toggleModal} 
             callReports={callReports}/>
    </div>, document.getElementById('backdrop-hook')
  );
}

export default Backdrop;

