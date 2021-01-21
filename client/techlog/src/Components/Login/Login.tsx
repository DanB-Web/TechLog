import * as React from 'react';

import { withRouter } from 'react-router-dom';

import('./Login.css');

const Login = ( { adminRights, history }) => {

  const adminMode = () => {
    adminRights(true);
    history.push('./search');
  }

  const userMode =() => {
    adminRights(false);
    history.push('./search');
  }

  return (
    <div className="login__container">
      <div className="login__title">
        <i className="fas fa-users"></i>
        <h3>Please log in...</h3>
      </div>
      <div className="login__buttons">
        <button onClick={userMode}>USER</button>
        <button onClick={adminMode}>ADMIN</button>
      </div>
    </div>
  )
}

export default withRouter(Login);