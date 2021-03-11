/* eslint-disable no-unused-vars *//* eslint-disable linebreak-style */
import React, {
  useState, useCallback, useRef, useEffect,
} from 'react';
import { Link } from 'react-router-dom';
import ButtonDelet from '../Forms/ButtonDelet';
import styles from './Administrative.module.css';
import Head from '../Helper/Head';
import Sair from '../../Assets/sair.svg';

const Administrative = () => {
  const token = localStorage.getItem('token');
  const userItems = useRef(false);
  const [user, setUser] = useState('');

  const handleGetUser = useCallback(async () => {
    fetch('https://lab-api-bq.herokuapp.com/users', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setUser(response);
        console.log(response);
      })
      .catch((error) => console.log('error', error));
  }, [setUser, token]);

  useEffect(() => {
    if (!userItems.current) {
      handleGetUser();
      userItems.current = true;
    }
    return () => {
      userItems.current = false;
    };
  }, [handleGetUser]);

  const handleDeletUser = (users) => {
    const uid = users.id;
    console.log(uid);
    fetch(`https://lab-api-bq.herokuapp.com/users/${uid}`, {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        handleGetUser();
      })
      .catch((error) => console.log('error', error));
  };
  return (
    <div>
      <Head title="💼 Administrativo" />
      <header className={styles.header}>
        <nav className={`${styles.nav} container`}>
          <Link className={styles.link_home} to="/">
            <img className={styles.img_home} src={Sair} alt="Icone para sair" />
          </Link>
          {'  '}
          <Link className={styles.link_Pedidos} to="/PedidosPronto">
            Pedidos Prontos ✅
          </Link>
          {'  '}
          <Link className={styles.link_Pedidos} to="/historicoPedidos">
            Histórico de Pedidos 📝
          </Link>
        </nav>
      </header>
      <h1>Usuarios Cadastrados</h1>
      <div>
        {user
        && user.map((users, index) => (
          <div key={users.id}>
            <div>
              <div>
                <li>
                  <p>
                    <b>
                      Usuario nº
                      {index}
                    </b>
                  </p>
                  <p>
                    Nome:
                    {users.name}
                  </p>
                  <p>
                    Email:
                    {users.email}
                  </p>
                  <p>
                    <b>
                      Ocupação:
                      {users.role}
                    </b>
                  </p>
                  <p>
                    Empresa:
                    {users.restaurant}
                  </p>
                  <ButtonDelet onClickBtn={() => handleDeletUser(users)} />
                </li>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};
export default Administrative;
