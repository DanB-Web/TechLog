import React, { useState } from 'react';

import './SearchItem.css';

import SearchItemTag from './SearchItemTag';

import Backdrop from '../../Modal/Backdrop';


const SearchItem = ( {admin, id, title, tags, searchTags, callReports} ) => {

  const [viewModal, setViewModal ] = useState(false);

  const checkTags = () => {
    let flag = true;
    searchTags.forEach(searchTag => {
      if (!tags.includes(searchTag)) flag = false;
    })
    return flag;
  }

  const toggleModal = () => {
    setViewModal(!viewModal);
  }

  if (!checkTags()) {
    return null;
  }

  if (viewModal) {
    return <Backdrop
      admin={admin}
      id={id} 
      title={title}
      toggleModal={toggleModal}  
      callReports={callReports}
      />
  }

  return (
    <div className="searchitem__container">
      <h3>{title}</h3>
      <ul>
        {tags.map((tag, index) => <SearchItemTag key={index} tag={tag}/>)}
      </ul>
      <button onClick={() => toggleModal()}>More details</button>
    </div>
  )
}

export default SearchItem;