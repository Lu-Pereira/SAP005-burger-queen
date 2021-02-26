import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import LoginForm from './LoginForm';
import LoginCreate from './LoginCreate';
import { UserContext } from '../../UserContext';
import styles from './Login.module.css';
import NotFound from '../NotFound';

const Login = () => {
  const { login } = React.useContext(UserContext);
  const history = useHistory();


  if (login === true) return history.push("/conta");
  return (
    <section className={styles.login}>
      <div className={styles.forms}>
          <LoginForm />
      </div>
    </section>
  );
};

export default Login;