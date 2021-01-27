import * as React from 'react';
import './Modal.css';
import rest from '../Utils/rest';
import Image from './Image';
import { useHistory } from 'react-router-dom';

interface ModalProps {
  admin: boolean,
  id: string,
  title: string,
  tags: string[],
  description: string,
  steps: string[],
  images: string[] | undefined,
  toggleModal: () => void,
  callReports: () => void
}

const Modal : React.FC<ModalProps> = ({admin, id, title, tags, description, steps, images, toggleModal, callReports}) => {
  const history = useHistory()
  const editReport = () => {history.push(`/edit/${id}`)}
  const deleteReport = async () => {
    await rest.deleteReport(id);
    callReports();
    toggleModal();
  }

  return (
    <>
      <div className="modal__container">
        <div className="modal__buttons">
          {admin &&
          <>
            <button onClick={editReport}>EDIT</button>
            <button onClick={deleteReport}>DELETE</button>
          </>
          }
          <button onClick={toggleModal}>CLOSE</button>
        </div>
        <h2>{title}</h2>
        <div className="modal__id">
          <label>Report ID: </label>
          <p className="modal__report-id">{id}</p>
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

        {(images && images.length) ?
        <div className="modal__image-container">

          <label>Images</label>
            <div className="modal__image-container-images">
              {images.length && images.map((image, index) => <Image
                key={index}
                image = {image}
            />)}
          </div>
        </div> : null}

      </div>
    </>
  )
}
export default Modal;
