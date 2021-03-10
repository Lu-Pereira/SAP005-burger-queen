/* eslint-disable linebreak-style */
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { Link } from 'react-router-dom';
import styles from './Kitchen.module.css';

export const Kitchen = () => {
  const token = localStorage.getItem('token');
  const [order, setOrder] = useState('');
  const orderItems = useRef(false);

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
      body: JSON.stringify({ status: 'Pronto' }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        const copia = order.filter((pedido) => pedido.id !== orderId);
        setOrder(copia);
      })
      .catch((error) => console.log('error', error));
  };

  const handleGetOrder = useCallback(async () => {
    fetch('https://lab-api-bq.herokuapp.com/orders', {
      headers: {
        method: 'GET',

        accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setOrder(response.filter((item) => item.status === 'pending'));
      })
      .catch((error) => console.log('error', error));
  }, [setOrder, token]);

  useEffect(() => {
    if (!orderItems.current) {
      handleGetOrder();
      orderItems.current = true;
    }
    return () => { orderItems.current = false; };
  }, [handleGetOrder]);

  return (

    <div>
      <h1>Pedidos solicitados</h1>
      <div className={styles.container_content}>
        {order && order
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((product, index) => (
            <div className={styles.container}>
              <div className={styles.card}>
                <div className={styles.card_container}>
                  <li key={product.id} className={styles.order}>
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
                        Estatus:
                        {product.status}
                      </b>
                    </p>
                    <div className={styles.products}>

                      <div className={styles.orderMenu}>
                        {product.Products.map((item) => (
                          <>
                            <p>{item.name}</p>
                            <p>
                              Quantidade:
                              {item.qtd}
                            </p>
                          </>
                        ))}
                        <button type="submit" onClick={() => handleUpdateOrder(product)}>Pedidos Prontos</button>
                      </div>
                    </div>
                  </li>
                </div>
              </div>
            </div>
          ))}
      </div>
      <Link className="link-home" to="/">
        Sair
      </Link>
    </div>
  );
};

export default Kitchen;
