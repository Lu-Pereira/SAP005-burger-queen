/* eslint-disable no-use-before-define */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import styles from './Menu.module.css';
import ButtonAdd from '../Forms/ButtonAdd';
import ButtonDelet from '../Forms/ButtonDelet';

export const Menu = () => {
  const token = localStorage.getItem('token');
  const [modal, setModal] = useState('');
  const [hamburgers, setHamburgers] = useState([]);
  const [order, setOrder] = useState([]);
  const [cafeMenu, setCafeMenu] = useState([]);
  const [accompaniment, setAaccompaniment] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [, setExcludeProduct] = useState([]);
  const [amount, setAmount] = useState([0]);
  const [productPrice, setProductPrice] = useState([0]);

  useEffect(() => {
    fetch('https://lab-api-bq.herokuapp.com/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const itens = data;
        const coffeeItems = itens.filter((products) => products.type.includes('breakfast'));
        const burgers = itens.filter((products) => products.sub_type.includes('hamburguer'));
        const sideDish = itens.filter((products) => products.sub_type.includes('side'));
        const drink = itens.filter((products) => products.sub_type.includes('drinks'));
        setDrinks(drink);
        setAaccompaniment(sideDish);
        setHamburgers(burgers);
        setCafeMenu(coffeeItems);
      })
      .catch((error) => console.log('error', error));
  }, []);

  const handleAddItems = (product) => {
    setOrderItems([...orderItems, product]);
    setProductPrice([...productPrice, product.price]);
  };

  useEffect(() => {
    const requestedProduct = orderItems.map((product) => ({
      id: product.id,
      qtd: 1,
    }));

    const quantity = requestedProduct.reduce((a, b) => {
      // eslint-disable-next-line no-param-reassign
      a[b.id] = a[b.id] || [];
      a[b.id].push(b);
      return a;
    }, Object.create(null));
    // eslint-disable-next-line no-console
    console.log(orderItems);

    const productList = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(quantity)) {
      productList.push({ id: key, qtd: value.length });
    }
    setOrder({ ...order, products: productList });
  }, [orderItems]);

  const totalSum = () => {
    setAmount(productPrice.reduce((total, num) => total + num, 0));
  };

  const deleteItems = (product) => {
    setAmount(productPrice.splice(orderItems.indexOf(product), 1));
    setExcludeProduct(orderItems.splice(orderItems.indexOf(product), 1));
    totalSum();
  };

  const submitOrder = () => {
    fetch('https://lab-api-bq.herokuapp.com/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        client: `${order.client}`,
        table: `${order.table}`,
        products:
        orderItems.map((product) => (
          {
            id: Number(product.id),
            qtd: 1,
          }
        )),
      }),
    })
      .then((response) => {
        response.json().then((data) => {
          console.log(data);
          setOrder({});
          setOrderItems([]);
          setAmount([]);
          setProductPrice([]);
          setExcludeProduct([]);
          alert('Pedido criado com sucesso!');
        });
      })
      .catch((error) => console.log('error', error));
  };

  return (
    <div className={styles.container_menu}>
      <div className={styles.list}>
        <Button onClickBtn={() => setModal(false)}>Lanches</Button>
        <Button onClickBtn={() => setModal(true)}>Café da Manhã</Button>
        <header>
          <Input
            labelText="Nome:"
            nameInput="name"
            typeInput="text"
            onChangeInput={(e) => setOrder({ ...order, client: e.target.value })}
          />
          <br />
          <Input
            labelText="Numero da mesa:"
            nameInput="table"
            typeInput="text"
            onChangeInput={(e) => setOrder({ ...order, table: e.target.value })}
          />
          <br />
        </header>
        <div className={styles.container_grid}>
          {modal ? (
            <div>
              <h3>🥞Café da manhã☕</h3>
              {cafeMenu.map((product) => (
                <div className={styles.container}>
                  <div className={styles.card}>
                    <div className={styles.card_container}>
                      <li key={product.id}>
                        <div className={styles.hamburgers_thumb}>
                          <img
                            src={product.image}
                            alt={`${product.name} Thumb`}
                          />
                        </div>
                        <p>{product.name}</p>
                        <p>
                          R$
                          {product.price}
                        </p>
                        <ButtonAdd onClickBtn={() => handleAddItems(product)} />
                      </li>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <h3>Hamburgueres🍟</h3>
              {hamburgers.map((product) => (
                <div className={styles.container}>
                  <div className={styles.card}>
                    <div className={styles.card_container}>
                      <li key={product.id}>
                        <div className={styles.hamburgers_thumb}>
                          <img
                            src={product.image}
                            alt={`${product.name} Thumb`}
                          />
                        </div>
                        <p>
                          <b>{`${product.name} ${product.flavor}`}</b>
                        </p>
                        <p>
                          {product.complement === 'null'
                            ? ''
                            : product.complement}
                        </p>
                        <p>
                          R$
                          {product.price}
                        </p>
                        <ButtonAdd onClickBtn={() => handleAddItems(product)} />
                      </li>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <h3>Acompanhamentos</h3>
          {accompaniment.map((product) => (
            <div className={styles.container}>
              <div className={styles.card}>
                <div className={styles.card_container}>
                  <li key={product.id}>
                    <div className={styles.hamburgers_thumb}>
                      <img src={product.image} alt={`${product.name} Thumb`} />
                    </div>
                    <p>{product.name}</p>
                    <p>
                      R$
                      {product.price}
                    </p>
                    <ButtonAdd onClickBtn={() => handleAddItems(product)} />
                  </li>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <h3>Bebidas</h3>
          {drinks.map((product) => (
            <div className={styles.container}>
              <div className={styles.card}>
                <div className={styles.card_container}>
                  <li key={product.id}>
                    <div className={styles.hamburgers_thumb}>
                      <img src={product.image} alt={`${product.name} Thumb`} />
                    </div>
                    <p>{product.name}</p>
                    <p>
                      R$
                      {product.price}
                    </p>
                    <ButtonAdd onClickBtn={() => handleAddItems(product)} />
                  </li>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.order}>
        <div>
          <h3>Produtos adicionados</h3>
          {orderItems.map((product) => (
            <div className={styles.container}>
              <div className={styles.card}>
                <div className={styles.card_container}>
                  <li key={product.id}>
                    <div className={styles.hamburgers_thumb}>
                      <img src={product.image} alt={`${product.name} Thumb`} />
                    </div>
                    <p>{product.name}</p>
                    <p>
                      {product.complement === 'null' ? '' : product.complement}
                    </p>
                    <p>
                      R$
                      {product.price}
                    </p>
                    <ButtonDelet onClickBtn={() => deleteItems(product)} />
                  </li>
                </div>
              </div>
            </div>
          ))}

          <div>
            <h3>Total</h3>
            <h3>
              R$
              {amount}
            </h3>
            <Button onClickBtn={() => totalSum()}>Totalizar itens</Button>
            <Button onClickBtn={() => submitOrder()}>Finalizar pedido</Button>
            <Link className="link-home" to="/">
              Sair
            </Link>
            <Link className="link-Pedidos" to="/PedidosPronto">
              Pedidos
            </Link>
          </div>
          <div />
        </div>
      </div>
    </div>
  );
};

export default Menu;
