import React, { useState, useEffect } from 'react';

import './SearchList.css';

import { listItemAnimation } from '../../Utils/animations'; 

import SearchBar from './SearchBar';
import SearchTags from './SearchTags';
import SearchItem from './SearchItem';

import rest from '../../Utils/rest';

const SearchList = ({ admin, holdReportId }) => {

  const [reports, setReports] = useState([]);
  const [searchTags, setSearchTags] = useState([]);

  //Initial render
  useEffect(() => {
    callReports();  
  }, []);

  //Call for reports
  const callReports = async () => {
    const dbCall = await rest.getReports();
    setReports(dbCall);
    listItemAnimation();
  }

  //Add search tag
  const searchTagHandler = (value) => {
    const prevTags = [...searchTags];  //Copy as an array so a ref value
    if (!prevTags.includes(value)) prevTags.push(value);
    setSearchTags(prevTags);
  }

  //Delete search tag
  const deleteTagHandler = (eventTarget) => {
    const prevTags = [...searchTags];
    const filterTags = prevTags.filter(element => element !== eventTarget);
    setSearchTags(filterTags);
  }

  return (
    <div className="searchlist__container">

      <SearchBar 
        classname="searchlist__searchbar"
        searchTagHandler={searchTagHandler}
      />

      <ul 
        className="searchlist__searchtags">
        { (searchTags && searchTags.length !== 0) ?
            searchTags.map((tag, index) => (
              <SearchTags 
              key={index}
              tag={tag}
              deleteTagHandler={() => deleteTagHandler(tag)}  
            />)
          ) : null
        }
      </ul>
      

      <ul
        className="searchlist__searchitems">
        { (reports && reports.length !== 0) ? 
          reports.map((report, index) => (<SearchItem
            key={index}
            admin={admin}
            report={report}
            holdReportId={holdReportId}
            searchTags={searchTags}
            callReports={callReports}
          />)
          ) : null
        }
      </ul>
    </div>
  )
}

export default SearchList;