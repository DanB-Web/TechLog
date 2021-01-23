import React, { useState } from 'react';

import './SearchBar.css';

interface SearchBarProps {
  searchTagHandler: (searchTerm: string) => void,
}

const SearchBar : React.FC<SearchBarProps> = ({ searchTagHandler }) => {

  const [searchTerm, setSearchTerm] = useState('');

  // const inputField = document.querySelector('.searchbar__input');

  //Enter key handler
  const enterHandler = (code: number) => {
    if (code === 13) {
      searchTagHandler(searchTerm);
      clearInput();
    }
  }

  const clearInput = () => {
   setSearchTerm('')
  }

  return (
    <div className="searchbar__container">
      <i className="fas fa-hashtag"></i>
      <input
        className="searchbar__input"
        type="text"
        onChange={event => setSearchTerm(event.target.value)}
        onKeyDown ={event => enterHandler(event.keyCode)}
        ></input>
      <button
        className="searchbar__submit-btn"
        onClick={() => { console.log('I\'m being clicked, and the input is: ', searchTerm);
          searchTagHandler(searchTerm); clearInput();}}
      >ADD TAG</button>
    </div>
  )
}

export default SearchBar;
