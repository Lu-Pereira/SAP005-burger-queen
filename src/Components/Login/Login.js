import React from 'react';
import { Switch, Route, Navigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import LoginCreate from './LoginCreate';
import { UserContext } from '../../UserContext';
import styles from './Login.module.css';
import NotFound from '../NotFound';

const Login = () => {
  const { login } = React.useContext(UserContext);

  if (login === true) return <Navigate to="/conta" />;
  return (
    <section className={styles.login}>
      <div className={styles.forms}>
      <Switch>
          <Route path="/" component={<LoginForm />} />
          <Route path="criar" component={<LoginCreate />} />
          <Route path="*" component={<NotFound />} />
        </Switch>
      </div>
    </section>
  );
};

export default Login;