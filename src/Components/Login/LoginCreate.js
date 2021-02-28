import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Head from '../Helper/Head';




const LoginCreate = () => {
  const [signIn, registrationData] = useState({ restaurant: 'burger game' });
  const direcion = useHistory();

  const directMenu = () => {
    direcion.push('/menu');
  };

  const directKitchen = () => {
    direcion.push('/kitchen');
  };

   const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://lab-api-bq.herokuapp.com/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signIn),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.role === 'waiter') {
          directMenu();
        } else if (data.role === 'cooker') {
          directKitchen();
        }
      });
    };

  

  return (
    <section className="animeLeft">
      <Head title="Crie sua conta" />
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" onChange={(e) =>
          registrationData({ ...signIn, name: e.target.value })
        }/>
        <Input label="Email" type="email" name="email"  onChange={(e) =>
              registrationData({ ...signIn, email: e.target.value })
            } />
        <Input label="Garçom/Garçonete" type='checkbox' name="role" value='waiter' onChange={(e) =>
              registrationData({ ...signIn, role: e.target.value })
            } />
        <Input label="Cozinheiro" type='checkbox' name="role" value='cooker' onChange={(e) =>
              registrationData({ ...signIn, role: e.target.value })
            }/>
            <Input label="Senha" type="password" name="password" onChange={(e) =>
              registrationData({ ...signIn, password: e.target.value })
            }/>
          <Button>Cadastrar</Button>
        <p>
          Se já for cadastrado: <Link to="/">Login</Link>
        </p>
      </form>
    </section>
  );
};

export default LoginCreate;