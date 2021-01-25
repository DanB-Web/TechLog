import React, { useState } from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import './Authorised.css';

import { modeAnimation } from '../../Utils/animations';

import Navbar from '../Nav/Navbar';
import SearchList from '../Search/SearchList';
import NewReport from '../NewReport/NewReport';
import EditReport from '../EditReport/EditReport'
import Login from '../Login/Login';
import Footer from '../Footer/Footer';

const Authorised = () => {

  //App Level State
  const [authorised, setAuthorised] = useState(true);     //Logged in or out
  const [admin, setAdmin] = useState(true);               //Admin mode
  const [mode, setMode] = useState('light');              //Light / dark mode

  //Variable + func to store report id for 'copy and paste' from /search to /edit 
  const [editReport, setEditReport] = useState(0);

  const holdReportId = (id) => {
    setEditReport(id);
  };

  //Log out of app
  const logout = () => {
    setAuthorised(false);
  }

  //Set admin rights
  const adminRights = (arg) => {
    setAdmin(arg);
    setAuthorised(true);
  }

  //Mode change
  const toggleMode = () => {
    modeAnimation();
    if (mode === 'light') {
      trans();
      setMode('dark'); 
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      trans();
      setMode('light'); 
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }

  //Transition for mode change
  const trans = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
      document.documentElement.classList.remove('transition')}, 1000);
  };

  return (
    <Router>
      <div className="footer-wrap">
        <div className="main-app">
          <Navbar 
            logout={logout}
            mode={mode}
            authorised={authorised}
            toggleMode={toggleMode}
            admin={admin}
          />
          <Switch>
            <Route exact path = '/search' render={(props) => (<SearchList {...props} admin={admin} holdReportId={holdReportId}/>)}/>  
            <Route exact path = '/new' component={NewReport}/>
            <Route exact path = '/edit' render={(props) => (<EditReport {...props} editReport={editReport}/>)}/>
            <Route exact path = '/logout' render={(props) => (<Login {...props} adminRights={adminRights}/>)}/>
            <Redirect to="/logout"/>
          </Switch>
        </div>
          <Footer/>
      </div>
    </Router>

  )
}

export default Authorised;
