import React from 'react';

import './SearchTags.css';

const SearchTags = ({tag, deleteTagHandler}) => {

  return (
    <div className="searchtag__frag">
      <li className="searchtag__tag" onClick={deleteTagHandler}>#{tag}</li>
      {/* <button className="searchtag__btn" onClick={deleteTagHandler}></button> */}
    </div>
  )
}

export default SearchTags;