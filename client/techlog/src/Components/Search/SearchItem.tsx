import * as React from 'react';
import { useState, useEffect } from 'react'
import './SearchItem.css';

import animations from '../../Utils/animations';

import SearchItemTag from './SearchItemTag';
import Backdrop from '../../Modal/Backdrop';

interface SearchItemProps {
  admin: boolean,
  id: string,
  title: string,
  tags: string[],
  searchTags: string[],
  description: string,
  steps: string[],
  images: string[] | undefined,
  reportId: (id: string) => void,
  callReports: () => void
}

const SearchItem : React.FC<SearchItemProps> = ( {admin, id, title, tags, searchTags, description, steps, images, reportId, callReports} ) => {

  const [viewModal, setViewModal ] = useState(false);

  const checkTags = () => {
    let flag = true;
    searchTags.forEach((searchTag) => {
      if (!tags.includes(searchTag)) flag = false;
    })
    return flag;
  }

  //Animate modal on way in
  useEffect( () => {
    if (viewModal === true) {
      animations.modalAnimationIn();
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
      id={id}
      title={title}
      tags={tags}
      description={description}
      steps={steps}
      images={images}
      reportId={reportId}
      toggleModal={toggleModal}
      callReports={callReports}
      />
  }

  return (
    <div className="searchitem__container">
      <h3>{title}</h3>
      <ul>
        {tags.map((tag: string, index: string | number | null | undefined) => <SearchItemTag key={index} tag={tag}/>)}
      </ul>
      <div className="searchitem__container__description">
        <p>{`${description.substring(0,100)}...`}</p>
      </div>
      <button onClick={() => toggleModal()}>More details</button>
    </div>
  )
}

export default SearchItem;
