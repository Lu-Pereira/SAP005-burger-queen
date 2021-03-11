/* eslint-disable linebreak-style */
import { Link, useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Head from '../Helper/Head';
import styles from './LoginCreate.module.css';

const LoginCreate = () => {
  const [signIn, registrationData] = useState({ restaurant: 'burger game' });
  const direcion = useHistory();

  const directMenu = () => {
    direcion.push('/menu');
  };

  const directKitchen = () => {
    direcion.push('/kitchen');
  };

  const directAdministrative = () => {
    direcion.push('/administrative');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://lab-api-bq.herokuapp.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',

      },
      body: JSON.stringify(signIn),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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
      <Head title="📝 Cadastro" />
      <form className={styles.forms} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Cadastre-se 📝</h1>
        <Input
          labelText="Usuário 👤"
          typeInput="text"
          nameInput="username"
          onChangeInput={(e) => registrationData({ ...signIn, name: e.target.value })}
        />
        <Input
          labelText="📧 E-mail"
          typeInput="email"
          nameInput="email"
          onChangeInput={(e) => registrationData({ ...signIn, email: e.target.value })}
        />
        <Input
          labelText="Garçom/Garçonete"
          typeInput="checkbox"
          nameInput="role"
          valueInput="waiter"
          onChangeInput={(e) => registrationData({ ...signIn, role: e.target.value })}
        />
        <Input
          labelText="Administrativo"
          typeInput="checkbox"
          nameInput="role"
          valueInput="administrative"
          onChangeInput={(e) => registrationData({ ...signIn, role: e.target.value })}
        />
        <Input
          labelText="Cozinheiro"
          typeInput="checkbox"
          nameInput="role"
          valueInput="cooker"
          onChangeInput={(e) => registrationData({ ...signIn, role: e.target.value })}
        />
        <Input
          labelText="Senha"
          typeInput="password"
          nameInput="password"
          onChangeInput={(e) => registrationData({ ...signIn, password: e.target.value })}
        />
        <Button>Cadastrar</Button>
        <p>
          Se já for cadastrado:
          {' '}
          <Link to="/">Login</Link>
        </p>
      </form>
    </section>
  );
};

export default LoginCreate;
