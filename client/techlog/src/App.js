import React from 'react';
import './App.css';
//cool stuff
import Authorised from './Components/App/Authorised';
import Unauthorised from './Components/App/Unauthorised';


function App() {

  //For future login functionality
  const authorised = true;

  return (
    <div className="App">
      {authorised ? 
        <Authorised/> :
        <Unauthorised/>}
    </div>
  );
}

export default App;
