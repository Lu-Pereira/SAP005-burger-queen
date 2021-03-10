/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import React, { useCallback, useState, useEffect } from 'react';
import styles from './OrderHistory.module.css';

export const OrderHistory = () => {
  const token = localStorage.getItem('token');
  const [orderItems, setOrderItems] = useState([]);
  const [order, setOrder] = useState([]);

  const handleGetOrderAll = useCallback(async () => {
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
        setOrder(response);
      })
      .catch((error) => console.log('error', error));
  }, [setOrder, token]);

  useEffect(() => {
    if (!orderItems.current) {
      handleGetOrderAll();
      orderItems.current = true;
    }
    return () => {
      orderItems.current = false;
    };
  }, [handleGetOrderAll]);

  return (
    <div>
      <h1>Historico de Pedidos</h1>
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

export default OrderHistory;
