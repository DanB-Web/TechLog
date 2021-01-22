import React from 'react';

import './SearchItemTag.css';

const SearchItemTag = ({tag}) => {

  return (
    <li className="searchitem__tag__li">#{tag}</li>
  )
}

export default SearchItemTag;