import {FC, useState} from 'react'
import { RouteComponentProps, useHistory, withRouter } from 'react-router-dom';
import styles from './Login.module.css';

interface LoginProps {
  adminRights : (hasAdminRights: boolean) => void,
}

const Login : FC<LoginProps & RouteComponentProps> = ( { adminRights } ) => {
  const history = useHistory()

  const [login, setLogin] = useState({username: '', password: ''});

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setLogin({...login, [e.target.name]: e.target.value})
  }

  const signIn = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (login.username === 'user' && login.password === 'user') {
      adminRights(false);
      history.push('/search');
    } else if (login.username === 'admin' && login.password === 'admin') {
      adminRights(true);
      history.push('/search');
    } else {
      setLogin({username: '', password: ''});
    }
  }

  return (
    <div className={styles.login__container}>
      <div className={styles.login__title}>
        <i className="fas fa-users"></i>
        <h3>Please log in...</h3>
      </div>
      <form onSubmit={signIn} className={styles.login_form}>
        <div className={styles.form_group}>
          <label>Username</label>
          <input 
            type="text" className="form-control" 
            placeholder="Enter email" name='username' 
            value={login.username} onChange={handleChange}
          />
        </div>

        <div className={styles.form_group}>
          <label>Password</label>
          <input 
            type="password" className="form-control" 
            name='password' value={login.password} 
            onChange={handleChange} placeholder="Enter password" 
          />
        </div>

        <div className={styles.form_group}>
          <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="customCheck1" />
            {" "}
            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
          </div>
        </div>

        <button type="submit" className={styles.submit_button}>Sign in</button>
        <p className="forgot-password text-right">
          Forgot <a href="/forgot">password?</a>
        </p>
        </form>
    </div>
  )
}

export default withRouter(Login);
