import React, { useState } from 'react';

import './SearchBar.css';

const SearchBar = ({ searchTagHandler }) => {
  
  const [searchTerm, setSearchTerm] = useState('');

  const inputField = document.querySelector('.searchbar__input');

  //Enter key handler
  const enterHandler = (code) => {
    if (code === 13) {
      searchTagHandler(searchTerm);
      clearInput();
    }
  }

  const clearInput = () => {
    inputField.value = '';
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
        onClick={() => {searchTagHandler(searchTerm); clearInput();}}
      >ADD TAG</button>
    </div>
  )
}

export default SearchBar;