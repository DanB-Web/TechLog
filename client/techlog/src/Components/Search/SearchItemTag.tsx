import React from 'react';

import './SearchItemTag.css';

interface Tag {
  tag: string
}

const SearchItemTag: React.FC<Tag>= ({tag}) => {

  return (
    <li className="searchitem__tag__li">#{tag}</li>
  )
}

export default SearchItemTag;