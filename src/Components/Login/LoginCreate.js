import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Error from '../Helper/Error';
import useForm from '../../Hooks/useForm';
import { USER_POST } from '../../Api';
import { UserContext } from '../../UserContext';
import useFetch from '../../Hooks/useFetch';
import Head from '../Helper/Head';
import { useHistory  } from 'react-router-dom';

const LoginCreate = () => {
  const name = useForm();
  const email = useForm('email');
  const password = useForm();
  const role = useForm();

  const { userLogin } = React.useContext(UserContext);
  const { loading, error, request } = useFetch();

  const direcion = useHistory();

  const directMenu = () => {
    direcion.push("/menu");
  };

  const directKitchen = () => {
    direcion.push("/kitchen");
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const { url, options } = USER_POST({
      name: name.value,
      email: email.value,
      password: password.value,
      role: role.value,
      restaurant: "burger game",
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.role === "waiter") {
        directMenu();
      } else if (data.role === "cooker") {
        directKitchen();
      }
    });
    const { response } = await request(url, options);
    if (response.ok) userLogin(name.value, password.value);
  }

  return (
    <section className="animeLeft">
      <Head title="Crie sua conta" />
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...name} />
        <Input label="Email" type="email" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />
        <Input label="Garçom/Garçonete" type="radio" name="role" value='waiter' {...role} />
        <Input label="Cozinheiro" type="radio" name="role" value='cooker' {...role} />

        {loading ? (
          <Button disabled>Cadastrando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
        <Error error={error} />
      </form>
    </section>
  );
};

export default LoginCreate;