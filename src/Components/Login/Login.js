import React from 'react';
import {
  BrowserRouter as Router,
  
  Route,
  useHistory 
} from "react-router-dom";
import LoginForm from './LoginForm';
import LoginCreate from './LoginCreate';
import styles from './Login.module.css';
import NotFound from '../NotFound';
import Menu from '../Menu/Menu'

const Login = () => {

  return (
    <section className={styles.login}>
      <div className={styles.forms}>
        <LoginForm />
      </div>
    </section>
  );
};

export default Login;