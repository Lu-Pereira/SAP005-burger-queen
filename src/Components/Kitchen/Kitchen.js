import React, { useEffect, useState } from "react";
import styles from './Kitchen.module.css';
import { Link } from "react-router-dom";

export const Kitchen = () => {
  const token = localStorage.getItem("token");
  const [order, setOrder] = useState([]);
  const [orderId, setOrderId] = useState([]);

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
        console.log(data);
      })

      .catch((error) => console.log("error", error));
  },[]);

  const deleteOrder = (product) => {
    fetch(
      "https://lab-api-bq.herokuapp.com/orders/"`${orderId}`,
      {
        method: "DELETE",
        path: `${orderId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      },
      []
    )
      .then((response) => response.json())
      .then((data) => {
        const dataId = data;
        const filterId = dataId.filter((products) =>
          products.id.includes("id")
        );
        setOrderId(filterId);
        console.log(data);
      })
      .then((data) => {
        const itens = data;
        //const item = itens.filter(product => product.id.includes('itensOrdem'));
        //setOrderId(item)
      }, [])
      .catch((error) => console.log("error", error));
  };

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