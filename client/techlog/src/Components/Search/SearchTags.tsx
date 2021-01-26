import React from 'react';
import './SearchTags.css';

interface SearchTagsProps {
  tag: string,
  deleteTagHandler: () => void
}

const SearchTags: React.FC<SearchTagsProps> = ({tag, deleteTagHandler}) => {
  return (
    <div className="searchtag__frag" data-testid="search-tags">
      <li className="searchtag__tag" data-testid="search-tag-item">#{tag}</li>
      <button className="searchtag__btn" onClick={deleteTagHandler}></button>
    </div>
  )
}

export default SearchTags;