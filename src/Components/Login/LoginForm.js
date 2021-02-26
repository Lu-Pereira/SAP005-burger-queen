import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import { UserContext } from '../../UserContext';
import Error from '../Helper/Error';
import styles from './LoginForm.module.css';
import stylesBtn from '../Forms/Button.module.css';
import Head from '../Helper/Head';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const direcion = useHistory();

  const directMenu = () => {
    direcion.push('/menu');
  };

  const directKitchen = () => {
    direcion.push('/kitchen');
  };

  const handleAuth = () => {
    fetch('https://lab-api-bq.herokuapp.com/auth', {
      body: `email=${email}&password=${password}`,
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded' 
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setEmail('');
        setPassword('');
        console.log(data);
        localStorage.setItem('token', data.token);
        if (data.role === 'waiter') {
          directMenu();
        } else if (data.role === 'cooker') {
          directKitchen();
        }
      });
  };

  const { userLogin, error, loading } = React.useContext(UserContext);

  async function handleSubmit(e) {
    e.preventDefault();

    if (email.validate() && password.validate()) {
      userLogin(email.value, password.value);
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Login" />
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Usuário (e-mail)" type="text" value={email} name="name" onChange={(e) => setEmail(e.target.value)} />
        <Input label="Senha" type="password" value={password} name="password" onChange={(e) => setPassword(e.target.value)} />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button type='submit' onClick={(e) => {
            e.preventDefault();
            handleAuth();
          }}>Entrar</Button>
        )}
        <Error error={error && 'Dados incorretos.'} />
      </form>
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
        <Link className={stylesBtn.button} to="/register">
          Cadastro
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;