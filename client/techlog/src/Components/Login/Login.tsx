import {FC} from 'react'
import { RouteComponentProps, useHistory, withRouter } from 'react-router-dom';
import styles from './Login.module.css';

interface LoginProps {
  adminRights : (hasAdminRights: boolean) => void,
}

const Login : FC<LoginProps & RouteComponentProps> = ( { adminRights } ) => {
  const history = useHistory()

  const adminMode = () => {
    adminRights(true);
    history.push('/search');
  }

  const userMode = () => {
    adminRights(false);
    history.push('/search');
  }

  return (
    <div className={styles.login__container}>
      <div className={styles.login__title}>
        <i className="fas fa-users"></i>
        <h3>Please log in...</h3>
      </div>
      <div className="login__buttons">
        <button onClick={userMode}>USER</button>
      </div>
    </div>
  )
}

export default withRouter(Login);
