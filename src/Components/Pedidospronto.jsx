/* eslint-disable linebreak-style */
/* eslint-disable-next-line linebreak-style *//* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */

import React, { useCallback, useEffect, useState } from 'react';
// import styles from "./PedidosProntos.module.css";

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
      <h1>Pedidos Finalizados</h1>
      <div>
        {order
          && order.map((product, index) => {
            const dataUpdated = new Date(product.updatedAt);
            const dataCreated = new Date(product.createdAt);
            const diferença = Math.abs(dataUpdated) - dataCreated;
            const minutes = Math.floor(diferença / 1000 / 60);
            return (
              <div>
                <div>
                  <div>
                    <li key={product.id}>
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
                      <div>
                        <div>
                          <button onClick={() => handleUpdateOrder(product)}>
                            Pedido entregue
                          </button>
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
