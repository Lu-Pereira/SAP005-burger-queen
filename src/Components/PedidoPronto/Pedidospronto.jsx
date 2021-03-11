/* eslint-disable linebreak-style */
/* eslint-disable max-len *//* eslint-disable no-unused-vars */
/* eslint-disable import/no-self-import *//* eslint-disable linebreak-style */
/* eslint-disable-next-line linebreak-style *//* eslint-disable react/button-has-type */
/* eslint-disable linebreak-style */
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Head from '../Helper/Head';
import Sair from '../../Assets/sair.svg';
import styles from './Pedidospronto.module.css';

export const Pedidos = () => {
  const token = localStorage.getItem('token');
  const [order, setOrder] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);
  const handleGetOrder = useCallback(async () => {
    fetch('https://lab-api-bq.herokuapp.com/orders', {
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
        setOrder(response.filter((item) => item.status === 'Pronto'));
      })
      .catch((error) => console.log('error', error));
  }, [setOrder, token]);

  useEffect(() => {
    if (!orderItems.current) {
      handleGetOrder();
      orderItems.current = true;
    }
    return () => {
      orderItems.current = false;
    };
  }, [handleGetOrder]);

  const handleUpdateOrder = (product) => {
    const orderId = product.id;
    console.log(orderId);
    fetch(`https://lab-api-bq.herokuapp.com/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `${token}`,
      },
      body: JSON.stringify({ status: 'Pedido entregue' }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setOrderStatus({ ...orderStatus, status: 'Pedido entregue' });
        handleGetOrder();
      })
      .catch((error) => console.log('error', error));
  };

  return (
    <div>
      <Head title="✅ Pedidos Prontos" />
      <header className={styles.header}>
        <nav className={`${styles.nav} container`}>
          <Link className={styles.link_home} to="/">
            <img className={styles.img_home} src={Sair} alt="Icone para sair" />
          </Link>
          {'  '}
          <Link className={styles.link_Pedidos} to="/menu">
            Menu 🍔🍴
          </Link>
          {'  '}
          <Link className={styles.link_Pedidos} to="/historicoPedidos">
            Histórico de Pedidos 📝
          </Link>
        </nav>
      </header>
      <h1>Pedidos Finalizados</h1>
      <div>
        {order
          && order.map((product, index) => {
            const dataUpdated = new Date(product.updatedAt);
            const dataCreated = new Date(product.createdAt);
            const diferença = Math.abs(dataUpdated) - dataCreated;
            const minutes = Math.floor(diferença / 1000 / 60);
            return (
              <div key={product.id} className={styles.container}>
                <div className={styles.card}>
                  <div className={styles.card_container}>
                    <li className={styles.order}>
                      <p>
                        <b>
                          Comanda nº
                          {index}
                        </b>
                      </p>
                      <p>
                        Cliente:
                        {product.client_name}
                      </p>
                      <p>
                        Mesa:
                        {product.table}
                      </p>
                      <p>
                        <b>
                          Status:
                          {product.status}
                        </b>
                      </p>
                      <p>
                        Tempo:
                        {minutes}
                        {' '}
                        min
                        {' '}
                      </p>
                      <div className={styles.products}>
                        <div lassName={styles.orderMenu}>
                          <p>
                            {product.Products.map((item) => (
                              <>
                                <p>{item.name}</p>
                                <p>
                                  Quantidade:
                                  {item.qtd}
                                </p>
                              </>
                            ))}
                            <button className={styles.btn} onClick={() => handleUpdateOrder(product)}>
                              Pedido entregue
                            </button>
                          </p>
                        </div>
                      </div>
                    </li>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Pedidos;
