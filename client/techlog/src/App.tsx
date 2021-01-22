import * as React from 'react';
import './App.css';
//cool stuff
import Authorised from './Components/App/Authorised';
import Unauthorised from './Components/App/Unauthorised';


export default function App () {

  //For future login functionality
  const authorised = true;

  return (
    <div className="App" data-testid="app">
      {authorised ? 
        <Authorised/> :
        <Unauthorised/>}
    </div>
  );
}


