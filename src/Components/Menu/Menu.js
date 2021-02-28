import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Button from '../Forms/Button';
import styles from './Menu.module.css';

export const Menu = () => {
  const token = localStorage.getItem("token");
  const [modal, setModal] = useState ('');
  const [hamburgers, setHamburgers] = useState([]);
  const [order, setOrder] = useState([]);
  const [cafeMenu, setCafeMenu] = useState([]);
  const [accompaniment, setAaccompaniment] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [excludedProduct, setExcludeProduct] = useState([]);
  const [amount, setAmount] = useState([]);
  const [productPrice, setProductPrice] = useState([]);

  useEffect(() => {
    fetch("https://lab-api-bq.herokuapp.com/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const itens = data;
        const coffeeItems = itens.filter((products) =>
          products.type.includes("breakfast")
        );
        const burgers = itens.filter((products) =>
          products.sub_type.includes("hamburguer")
        );
        const sideDish = itens.filter((products) =>
          products.sub_type.includes("side")
        );
        const drink = itens.filter((products) =>
          products.sub_type.includes("drinks")
        );
        setDrinks(drink);
        setAaccompaniment(sideDish);
        setHamburgers(burgers);
        setCafeMenu(coffeeItems);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const addItems = (product) => {
    setOrderItems([...orderItems, product]);
    setProductPrice([...productPrice, product.price]);
    const requestedProduct = orderItems.map((product) => {
      return {
        id: product.id,
        qtd: 1,
      };
    });
    const quantity = requestedProduct.reduce(function (a, b) {
      a[b.id] = a[b.id] || [];
      a[b.id].push(b);
      return a;
    }, Object.create(null));

    const productList = [];
    for (const [key, value] of Object.entries(quantity)) {
      productList.push({
        id: key,
        qtd: value.length,
      });
    }

    setOrder({ ...order, products: productList });
    console.log(order);
  };

  const totalSum = () => {
    setAmount(productPrice.reduce((total, num) => total + num));
  }

  const deleteItems = (product) => {
    setAmount(productPrice.splice(orderItems.indexOf(product), 1));
    setExcludeProduct(orderItems.splice(orderItems.indexOf(product), 1));
    totalSum();
  }

  const submitOrder = () => {
    fetch("https://lab-api-bq.herokuapp.com/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(order),
    })
      .then((response) => {
        response.json()
        .then((data) => console.log(data));
        setOrder({});
        setOrderItems([]);
        setAmount([]);
        setProductPrice([]);
        setExcludeProduct([]);
        alert('Pedido criado com sucesso!')
      })
      .catch((error) => console.log("error", error));
    };

  return (
    <div className={styles.container_menu}>
      <div className={styles.list}>
      <Button onClick={()=> setModal(false)}>Lanches</Button>
      <Button onClick={()=> setModal(true)}>Café da Manhã</Button>
      <header>
        <label>Name:</label><br/>
        <input
          name="name"
          type="text"
          onChange={(e) => setOrder({ ...order, client: e.target.value })}
        /><br/>
        <label>Numero da mesa:</label><br/>
        <input
          name="table"
          type="text"
          onChange={(e) => setOrder({ ...order, table: e.target.value })}
        /><br/>
      </header>
      <div className={styles.container_grid}>
      {
        modal ?
        <div>
        <h3>Café da manhã</h3>
        {cafeMenu.map((product) => {
          return (
            <div onClick={() => addItems(product)}className={styles.container}>
              <div className={styles.card}>
                <div className={styles.card_container}>
                  <li key={product.id}>
                    <div className={styles.hamburgers_thumb}>
                      <img src={product.image} alt={`${product.name} Thumb`} />
                    </div>
                    <p>{product.name}</p>
                    <p>R${product.price}</p>
                  </li>
                </div>
              </div>
            </div>
          );
        })}
        </div>
        :
      <div>
        <h3>Hamburgueres</h3>
        {hamburgers.map((product) => {
          return (
            <div onClick={() => addItems(product)} className={styles.container}>
              <div className={styles.card}>
                <div className={styles.card_ontainer}>
                  <li key={product.id}>
                    <div className={styles.hamburgers_thumb}>
                      <img src={product.image} alt={`${product.name} Thumb`} />
                    </div>
                    <p>{product.name}</p>
                    <p>{product.complement}</p>
                    <p>R${product.price}</p>
                  </li>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      }
      </div>
      <div>
        <h3>Acompanhamentos</h3>
        {accompaniment.map((product) => {
          return (
            <div onClick={() => addItems(product)} className={styles.container}>
              <div className={styles.card}>
                <div className={styles.card_container}>
                  <li key={product.id}>
                    <div className={styles.hamburgers_thumb}>
                      <img src={product.image} alt={`${product.name} Thumb`} />
                    </div>
                    <p>{product.name}</p>
                    <p>R${product.price}</p>
                  </li>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <h3>Bebidas</h3>
        {drinks.map((product) => {
          return (
            <div onClick={() => addItems(product)} className={styles.container}>
              <div className={styles.card}>
                <div className={styles.card_container}>
                  <li key={product.id}>
                    <div className={styles.hamburgers_thumb}>
                      <img src={product.image} alt={`${product.name} Thumb`} />
                    </div>
                    <p>{product.name}</p>
                    <p>R${product.price}</p>
                  </li>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>
      <div className={styles.order}>
      <div>
        <h3>Produtos adicionados</h3>
        {orderItems.map((product, index) => {
          return (
            <div onClick={() => deleteItems(product)} className={styles.container}>
              <div className={styles.card}>
                <div className={styles.card_container}>
                  <li key={index}>
                    <div className={styles.hamburgers_thumb}>
                      <img src={product.image} alt={`${product.name} Thumb`} />
                    </div>
                    <p>{product.name}</p>
                    <p>
                      {product.complement === "null" ? "" : product.complement}
                    </p>
                    <p>R${product.price}</p>
                  </li>
                </div>
              </div>
            </div>
          );
        })}
        <div>
          <h3>Total</h3>
          <h3>R${amount}</h3>
          <Button onClick={() => totalSum()}>Totalizar itens</Button>
          <Button onClick={() => submitOrder()}>Finalizar pedido</Button>
        </div>
        <div>
          <Link className="link-home" to="/">
            Sair
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Menu;