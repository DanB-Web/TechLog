import * as React from 'react';
import { createPortal } from 'react-dom';
import './Backdrop.css';
import Modal from './Modal';

interface BackdropProps {
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

const Backdrop : React.FC<BackdropProps> = ({admin, id, title, tags, description, steps, images, toggleModal, callReports}) => 
 createPortal (
    <div className="backdrop__container">
      <Modal admin={admin}
             id={id}
             title={title}
             tags={tags}
             description={description}
             steps={steps}
             images={images}
             toggleModal={toggleModal}
             callReports={callReports}/>
    </div>, document.getElementById('backdrop-hook') as unknown as HTMLElement
  );

export default Backdrop;

