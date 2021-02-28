import React, { useEffect, useState } from "react";
import styles from './Kitchen.module.css';
import { Link } from "react-router-dom";

export const Kitchen = () => {
  const token = localStorage.getItem("token");
  const [order, setOrder] = useState([]);
  const [orderId, setOrderId] = useState([]);
  const [orderReady, setOrderReady] = useState({status: "pending"});

  useEffect(() => {
    fetch("https://lab-api-bq.herokuapp.com/orders", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
    })
      .then((response) => response.json())
      .then((response) => {
        setOrder(response);
        })
        .then((data) => {
            const itens = data;
            const id = itens.filter((products) => products.id.includes('id'));
            setOrderReady(id)
            console.log(id);

        })
        .catch((error) => console.log("error", error));
    }, []);

    const handleUpdateOrder = () => {
        fetch('https://lab-api-bq.herokuapp.com/orders', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
            },
            path: '',
        })
        setOrderReady({...orderReady, status: 'finished'})
    }



  return (
    <>
      <h1>Pedidos solicitados</h1>
      <div className={styles.container_content}>
      {order.map((product, index) => {
        return (
          <div className={styles.container}>
            <div className={styles.card}>
              <div className={styles.card_container}>
                <li key={index}>
                  <p><b>Comanda nº {index}</b></p>
                  <p>Cliente: {product.client_name}</p>
                  <div className={styles.products}>
                   <p>{product.Products.map((item,index2)=>(
                       <>
                     <p>{item.name}</p>
                     <p>Quantidade: {item.qtd}</p>
                      
                     </>
                   ))}</p> 
                  <p>Mesa: {product.table}</p>
                  <p><b>Estatus: {product.status}</b></p>
                   </div>
                </li>
              </div>
            </div>
          </div>
        );
      })}
      </div>
      <Link className="link-home" to="/">
        Sair
      </Link>
    </>
  );
};

export default Kitchen;