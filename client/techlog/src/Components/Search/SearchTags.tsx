import React from 'react';
import './SearchTags.css';

interface SearchTagsProps {
  tag: string,
  deleteTagHandler: () => void
}

const SearchTags: React.FC<SearchTagsProps> = ({tag, deleteTagHandler}) => {
  return (
    <div className="searchtag__frag" data-testid="search-tags">
      <button className="searchtag__btn" onClick={deleteTagHandler}>
        <li className="searchtag__tag" data-testid="search-tag-item">#{tag}</li>

      </button>
    </div>
  )
}

export default SearchTags;