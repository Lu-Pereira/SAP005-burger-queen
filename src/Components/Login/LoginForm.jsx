/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import styles from './LoginForm.module.css';
import Head from '../Helper/Head';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [active, setActive] = useState(false);
  const direcion = useHistory();

  const handleClick = () => {
    setActive(!active);
  };

  const directMenu = () => {
    direcion.push('/menu');
  };

  const directKitchen = () => {
    direcion.push('/kitchen');
  };

  const directAdministrative = () => {
    direcion.push('/administrative');
  };

  const handleAuth = () => {
    fetch('https://lab-api-bq.herokuapp.com/auth', {
      body: `email=${email}&password=${password}`,
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
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
        } else if (data.role === 'administrative') {
          directAdministrative();
        }
      });
  };

  return (
    <section className="animeLeft">
      <Head title="🍔🎮 Login" />
      <form className={styles.form}>
        <h1 className={styles.title}>Login</h1>
        <Input
          labelText="Usuário (e-mail)"
          typeInput="text"
          nameInput="name"
          onChangeInput={(e) => setEmail(e.target.value)}
        />
        <Input
          labelText="Senha"
          typeInput="password"
          nameInput="password"
          onChangeInput={(e) => setPassword(e.target.value)}
        />
        <Button
          typeButton="submit"
          onClickBtn={(e) => {
            e.preventDefault();
            handleAuth();
            handleClick();
          }}
        >
          {active ? 'Carregando...' : 'Entrar'}
        </Button>
        <p className={styles.text}>Ainda não possui conta? Cadastre-se no site.</p>
        <Button>
          <Link to="/register">
            Cadastro
          </Link>
        </Button>
      </form>
    </section>
  );
};

export default LoginForm;
