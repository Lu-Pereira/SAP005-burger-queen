/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import LoginForm from './LoginForm';
import styles from './Login.module.css';

const Login = () => (
  <section className={styles.login}>
    <div className={styles.forms}>
      <img src="https://media.giphy.com/media/loRt6ja0q6VHcljBCk/giphy.gif" />
      <LoginForm />
    </div>
  </section>
);

export default Login;
