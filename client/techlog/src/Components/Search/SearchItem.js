import React, { useState, useEffect } from 'react';

import './SearchItem.css';

import { modalAnimationIn } from '../../Utils/animations';

import SearchItemTag from './SearchItemTag';
import Backdrop from '../../Modal/Backdrop';


const SearchItem = ( {admin, report, searchTags, holdReportId, callReports} ) => {

  const [viewModal, setViewModal ] = useState(false);

  const checkTags = () => {
    let flag = true;
    searchTags.forEach(searchTag => {
      if (!report.tags.includes(searchTag)) flag = false;
    })
    return flag;
  }

  //Animate modal on way in
  useEffect( () => {
    if (viewModal === true) {
      modalAnimationIn();
    } 
  }, [viewModal]);

  const toggleModal = () => {
    setViewModal(!viewModal);
  }

  if (!checkTags()) {
    return null;
  }

  if (viewModal) {
    return <Backdrop
      admin={admin}
      report={report}
      holdReportId={holdReportId}
      toggleModal={toggleModal}  
      callReports={callReports}
      />
  }

  return (
    <div className="searchitem__container">
      <h3>{report.title}</h3>
      <ul>
        {report.tags.map((tag, index) => <SearchItemTag key={index} tag={tag}/>)}
      </ul>
      <div className="searchitem__container__description">
        <p>{`${report.description.substring(0,100)}...`}</p>
      </div>
      <button onClick={() => toggleModal()}>More details</button>
    </div>
  )
}

export default SearchItem;