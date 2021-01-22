import * as React from 'react';

import './Unauthorised.css';

import Login from '../Login/Login';

const Unauthorised = () => {
  return (
    <Login adminRights = {(arg: boolean) => {}}/>
  )
}

export default Unauthorised;
